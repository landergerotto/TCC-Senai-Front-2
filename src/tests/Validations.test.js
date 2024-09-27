import { describe, expect, test } from 'vitest'
import cryptoService from '../service/cryptoService'
import jwtService from '../service/jwtService'
import { apiUrl } from '../Api/apiUrl';

// The two tests marked with concurrent will be started in parallel
describe('Tests', () => {
    test('Decryption test', () => {
        const data = {
            "EDV": "7777",
            "FirstName": "Loud",
            "LastName": "Caspas",
            "DisplayName": "Loud Caspas (CtP/ETS)",
            "Email": "loud.caspas@email.com",
            "Birth": "2024-09-17",
            "Password": "olhanao",
            "BoschId": "CAL1CT"
          };
        const encrypted = cryptoService.encryptData(data);

        expect(JSON.stringify(cryptoService.decrypt(encrypted)))
        .toBe(JSON.stringify(data))
     });

    test('Jwt Decode test', () => {
        expect(JSON.stringify(jwtService.decodeJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJqb2huX2RvZSIsInJvbGUiOiJ0ZXN0IiwiaWF0IjoxNzI3MDk1MDU0LCJleHAiOjE3MjcwOTg2NTR9.C2I8cnQcSr1_-Hi2O5Mz0B2Ta0YL3uVDsV0zAPDzLKQ')))
        .toBe(JSON.stringify({
            userId: '1234567890',
            username: 'john_doe',
            role: 'test',
            iat: 1727095054,
            exp: 1727098654,
        }))
    })

    test('Jwt Validation test (true)', async () => { 
        expect(await jwtService.validateJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJqb2huX2RvZSIsInJvbGUiOiJ0ZXN0IiwiaWF0IjoxNzI3MDk1MDU0LCJleHAiOjE3MjcwOTg2NTR9.C2I8cnQcSr1_-Hi2O5Mz0B2Ta0YL3uVDsV0zAPDzLKQ'))
        .toBe(true)
    })

    test('Jwt Validation test (false)', async () => { 
        expect(await jwtService.validateJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwidXNlcm5hbWUiOiJqb2huX2RvZSIsInJvbGUiOiJ0ZXN0IiwiaWF0IjoxNzI3MDk1MDU0LCJleHAiOjE3MjcwOTg2NTR9.C2I8cnQcSr1_-Hi2O5Mz0B2Ta0YL3uVDsV0zAPDzLKekw'))
        .toBe(false)
    });

    test('Part Number get', async () => {
        const res = await apiUrl.get('/partnr/get');
        expect(res.status).toBe(200)
    });

    test('POC get', async () => {
        const res = await apiUrl.get('/poc/get');
        expect(res.status).toBe(200)
    })

    test('Process get', async () => {
        const res = await apiUrl.get('/process/get');
        expect(res.status).toBe(200)
    })
    
    test('User get', async () => {
        const res = await apiUrl.get('/user/get');
        expect(res.status).toBe(200)
    })
})