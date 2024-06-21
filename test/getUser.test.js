import { addUser, getDocUserById } from "../libs/firestoreMethods"

describe('Login user and check the user is fined ', () => { 
    test('should can adding user', async () => { 
        const data = {
            userId: "123",
            email: "test@gmail.com",
            createdAt: new Date()
        }
        const isTrue = await addUser(data.userId, data);
        
        expect(isTrue).toBe('success adding user');
    })

    test('should can getting user', async () => { 
        const idUser = "3U40vTwzEcN43dAhrOSTE3BeLYd2";
        const testing = await getDocUserById(idUser);
        expect(testing).toContain('3U40vTwzEcN43dAhrOSTE3BeLYd2');
     }, 10000)

 })