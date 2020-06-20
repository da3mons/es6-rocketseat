import axios from 'axios';

/*          EXERCÍCIO 1     */
// const delay = () => new Promise(resolve => setTimeout(resolve, 1000));
// async function delay_new(){
// 	await delay();
// 	console.log('1');
// 	await delay();
// 	console.log('2');
// 	await delay();
// 	console.log('3');
// }
// delay_new();

/*          EXERCÍCIO 2     */
// async function getUserFromGithub(user){
//     try {
//         const response = await axios.get(`https://api.github.com/users/${user}`)
//         console.log(response)
//     }catch (err){
//         console.warn(err)
//     }
// }
// getUserFromGithub('da3mons');

/*          EXERCÍCIO 3     */
// class Github {
//     static async getRepositories(repo) {
//         try {
//             const response = await axios.get(`https://api.github.com/repos/${repo}`);
//             console.log(response.data);
//         }catch(err) {
//             console.log('Repositório não existe');
//         }
//     }
// }
// Github.getRepositories('da3mons/Manual-RTKLib.V1');
// Github.getRepositories('da3mons/INPE-Code');


/*          EXERCÍCIO 4     */
const buscaUsuario = async user => {
    try{
        const response = await axios.get(`https://api.github.com/users/${user}`)
        console.log(response.data);
    }catch(err){
        console.log('Usuário não existe');
    };
}
buscaUsuario('da3mons');