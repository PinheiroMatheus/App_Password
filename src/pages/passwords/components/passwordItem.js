import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useState, useEffect } from 'react'

export function PasswordItem({ data, removePassword }){
    const [allowView, setAllowView] = useState(true)

    return (
        <Pressable style={styles.container}>
            <Text style={styles.textContainer}>{ data }</Text>
            <Pressable style={styles.containerIcons}>
                <Icon name="trash" size={25} color="#fff" onPress={removePassword}/>
            </Pressable>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#0E0E0E',
        padding: 14,
        width: '100%',
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerIcons:{
        flexDirection: 'row',
        gap: '15em'    
    },
    textContainer:{
        color: '#fff',
        fontSize: '20em'
    }
})