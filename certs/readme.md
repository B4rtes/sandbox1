# Below you find commands were used for creating such files

key.pem - private key
`openssl genrsa -out key.pem`

csr.pem - Certificate Signing Request
`openssl req -new -key key.pem -out csr.pem`

cert.pem - SSL Certificate
`openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem`