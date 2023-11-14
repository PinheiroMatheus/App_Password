import { useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useIsFocused } from '@react-navigation/native'
import useStorage from '../../hooks/useStorage'
import { PasswordItem } from './components/passwordItem'
import Icon from 'react-native-vector-icons/FontAwesome'

export function Passwords() {
    const [listPasswords, setListPasswords] = useState([])
    const focused = useIsFocused()
    const { getItem, removeItem } = useStorage()
    const [allowView, setAllowView] = useState(true)

    useEffect(() => {
        async function loadPasswords() {
            const passwords = await getItem('@pass')
            setListPasswords(passwords)
        }

        loadPasswords()
    }, [focused])

    async function handleDeletePassword(item) {
        const passwords = await removeItem('@pass', item)
        setListPasswords(passwords)

        alert("Senha deletada com sucesso!")
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.header}>
                <Text style={styles.title}>Minhas senhas</Text>
                <Icon name={ allowView ? 'eye-slash' : 'eye' } size={25} color="#fff" onPress={ () => allowView ? setAllowView(false) : setAllowView(true) }/>
            </View>
            <View style={styles.content}>
                <FlatList
                    style={{ flex: 1, paddingVertical: 14 }}
                    data={listPasswords}
                    keyExtractor={(item) => String(item)}
                    renderItem={({ item }) => <PasswordItem data={allowView ? item : '*********************'} removePassword={() => handleDeletePassword(item)} />}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#392de9',
        paddingTop: 58,
        paddingBottom: 14,
        paddingHorizontal: 18,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        paddingHorizontal: 14,
    }
})