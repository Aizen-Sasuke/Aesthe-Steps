# Firestore Security Rules Specification & Red-Team Payloads

## Data Invariants
1. Public visitors can only view published `products` (`isPublished == true`) and `storeConfig/main`.
2. Public visitors can create `orders` ONLY with strict schema validation, `status == 'pending'`, non-empty bounded fields, and server timestamps (`request.time`), and can NEVER list, read, update, or delete any customer order containing PII (`customerName`, `customerPhone`, `customerAddress`).
3. Admin privileges require `request.auth != null && request.auth.token.email_verified == true` AND either the bootstrapped founder email (`brightdiamondhax@gmail.com`) or a matching verified entry in `/adminAllowlist/{sanitizedEmail}`.
4. Document IDs across all collections match strict `^[a-zA-Z0-9_\\-]+$` bounds (`<= 128` chars) to block path poisoning and oversized writes.
5. All timestamp fields (`createdAt`, `updatedAt`, `addedAt`) must equal `request.time`, and `createdAt` is immutable on update.

## Adversarial Payloads Verified Rejected
1. **Unauthenticated Order Read/List**: Non-admin attempting `get` or `list` on `/orders` -> `PERMISSION_DENIED`.
2. **Pre-Confirmed Fake Order Create**: Guest creating `/orders/{id}` with `status: 'delivered'` or `status: 'confirmed'` -> `PERMISSION_DENIED`.
3. **Timestamp Forgery**: Client writing `createdAt` in the past/future (`!= request.time`) -> `PERMISSION_DENIED`.
4. **Shadow/Ghost Field Injection**: Creating an `order`, `product`, or `storeConfig` containing unexpected keys like `isAdmin: true` or `shadow: 1` -> `PERMISSION_DENIED`.
5. **Oversized String DoS**: Injecting a 1MB `customerAddress` or `productId` (`> 128` chars) -> `PERMISSION_DENIED`.
6. **Unverified Email Admin Spoof**: Token claiming partner email with `email_verified: false` -> `PERMISSION_DENIED`.
7. **Other User Allowlist Enumeration**: Signed-in non-partner listing `/adminAllowlist` or reading another partner's document -> `PERMISSION_DENIED`.
8. **Self-Promotion to Allowlist**: Signed-in non-partner creating their own `/adminAllowlist/{ownKey}` document -> `PERMISSION_DENIED`.
9. **Unpublished Product Leak**: Public visitor reading a hidden/draft product (`isPublished == false`) -> `PERMISSION_DENIED`.
10. **Store Config Tampering**: Non-admin updating `whatsappNumber`, `insideDhakaFee`, or `promoCodes` -> `PERMISSION_DENIED`.
11. **Order Mutation After Creation (`createdAt` Tampering)**: Attempting to alter `createdAt` on order update -> `PERMISSION_DENIED`.
12. **Array Unbounded Injection**: Submitting an order with `items.size() > 50` or empty `items` -> `PERMISSION_DENIED`.
