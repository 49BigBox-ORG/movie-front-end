import Axios from './axiosClient'
import {print} from 'graphql'
import gql from 'graphql-tag'

const LOG_IN = gql`
    mutation login($username:String!, $password: String) {
        login(input:{username: $username, password: $password}) {
            username
            fullName
            avatar
            email
            phoneNumber
            roleName
            accessToken
        }
    }
`

const SIGN_UP = gql`
    mutation signup(
        $username:String!,
        $password: String,
        $fullName: String,
        $email: String,
        $phoneNumber: String,
        $birthday: String,
        $genderId: Int,
    ) {
        signup(input:{
            username: $username,
            password: $password,
            fullName: $fullName,
            email: $email,
            phoneNumber: $phoneNumber,
            birthday: $birthday,
            genderId: $genderId,
        }) {
            username
            password
            roleName
        }
    }
`

const GET_ACCOUNT_BALANCE = gql`
    query getUserBalanceWithAccessToken {
        getUserBalanceWithAccessToken{
            balance
        }
    }
`

const DEPOSIT = gql`
    mutation deposit($amount: Int!) {
        deposit(input:{amount: $amount}) {
            balance
        }
    }
`

const PURCHASE_MOVIE = gql`
    mutation purchaseMovie($movieId: Int!, $promoCode: String) {
        purchaseMovie(input:{movieId: $movieId, promoCode: $promoCode}) {
            movieId
            accountBalance{
                balance
            }
        }
    }
`

const GET_GENDER = gql`
    query gender {
        gender{
            id
            gender
        }
    }
`

const GET_USER_INFO = gql`
    query getUserInfo {
        getUserInfo{
            username
            avatar
            fullName
            email
            phoneNumber
            birthday
            genderId
            balance
            purchasedMovie {
                id
                title
                image
            }
        }
    }
`

const UPDATE_USER_INFO = gql`
    mutation updateProfile($fullName: String, $email: String, $phoneNumber: String, $birthday: String, $genderId: Int) {
        updateProfile(input:{
            fullName: $fullName,
            email: $email,
            phoneNumber: $phoneNumber,
            birthday: $birthday,
            genderId: $genderId,
        }) {
            fullName
            email
            phoneNumber
            birthday
            genderId
        }
    }
`

const UPDATE_AVATAR = gql`
    mutation updateAvatar($avatar: String!) {
        updateAvatar(input:{avatar: $avatar}) {
            avatar
        }
    }
`

class UserAPI {
    login = (data, setLoading = true) => {
        const payload = {
            query: print(LOG_IN),
            variables: {
                username: data.username,
                password: data.password,
            },
        }
        return Axios.postMethod(payload, setLoading)
    }

    getAccountBalance = (setLoading = true) => {
        const payload = {
            query: print(GET_ACCOUNT_BALANCE),
        }
        return Axios.postMethod(payload, setLoading)
    }

    deposit = (data, setLoading = true) => {
        const payload = {
            query: print(DEPOSIT),
            variables: {
                amount: data.amount,
            },
        }
        return Axios.postMethod(payload, setLoading)
    }

    purchaseMovie = (data, setLoading = true) => {
        const payload = {
            query: print(PURCHASE_MOVIE),
            variables: {
                movieId: data.id,
                promoCode: data.promoCode,
            },
        }
        return Axios.postMethod(payload, setLoading)
    }

    getGender = (setLoading = true) => {
        const payload = {
            query: print(GET_GENDER),
        }
        return Axios.postMethod(payload, setLoading)
    }

    signup = (data, setLoading = true) => {
        const payload = {
            query: print(SIGN_UP),
            variables: {
                username: data.username,
                password: data.password,
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                birthday: data.birthday,
                genderId: data.genderId,
            },
        }
        return Axios.postMethod(payload, setLoading)
    }

    getUserInfo = (setLoading = true) => {
        const payload = {
            query: print(GET_USER_INFO),
        }
        return Axios.postMethod(payload, setLoading)
    }

    updateProfile = (data, setLoading = true) => {
        const payload = {
            query: print(UPDATE_USER_INFO),
            variables: {
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                birthday: data.birthday,
                genderId: data.genderId,
            }
        }
        return Axios.postMethod(payload, setLoading)
    }

    updateAvatar = (data, setLoading = true) => {
        const payload = {
            query: print(UPDATE_AVATAR),
            variables: {
                avatar: data.avatar,
            }
        }
        return Axios.postMethod(payload, setLoading)
    }
}

const userService = new UserAPI();

export default userService;
