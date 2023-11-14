import AsyncStorage from '@react-native-async-storage/async-storage'

const useStorage = () => {
    // Buscar os itens salvos
    const getItem = async (key) => {
        try{
            const passwords = await AsyncStorage.getItem(key)
            return JSON.parse(passwords) || []
        }catch(error){
            console.log('Erro ao buscar ', error)
            return []
        }
    }

    // Salvar um item no storage
    const saveItem = async (key, value) => {
        try{
            let passwords = await getItem(key) // Pega todas as senhas

            passwords.push(value) // Insere a nova senha

            await AsyncStorage.setItem(key, JSON.stringify(passwords)) // atualiza o AsyncStorage
        }catch(error){
            console.log('Erro ao salvar ', error)
        }
    }

    // Remover algo no storage
    const removeItem = async (key, item) => {
        try{
            let passwords = await getItem(key) // Pegar todas as senhas

            let myPasswords = passwords.filter( (password) => {
                return (password !== item)
            } ) // Retorna todas as senhas que não sejam iguais a senha informada(item)

            await AsyncStorage.setItem(key, JSON.stringify(myPasswords)) // Atualiza o AsyncStorage

            return myPasswords // Retorna a lista atualizada sem o item
        }catch(error){
            console.log('Erro ao deletar ', error)
        }
    }

    return {
        getItem,
        saveItem,
        removeItem,
    }
}

export default useStorage