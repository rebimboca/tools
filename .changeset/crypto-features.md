---
"@rebimboca/crypto": minor
---

Melhorias robustas em criptografia e segurança:
- Validador centralizado de hashes sintáticos MD5, SHA-1, SHA-256 e SHA-512 (`validateHash`).
- Suporte a geração de assinaturas HMAC (`encodeHMAC`).
- Funções dedicadas para geração de SHA-256 e SHA-512 (`encodeSHA256` e `encodeSHA512`).
- Nova localização e refatoração para cálculo de Checksum CRC-32 (`calculateCRC32`).
- Gerador nativo de UUID v4 (`generateUUID`).
- Validação robusta de força de senha seguindo as normas NIST SP 800-63B com feedback detalhado.
