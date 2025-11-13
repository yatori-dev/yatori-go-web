import request from "../../utils/request.ts";

//添加用户接口
export function addUser(accountType: string,username: string, password: string) {
    const data={
        accountType:accountType,
        username:username,
        password:password
    }
    return request({
        url: '/addUser',
        headers: {
        },
        method: 'POST',
        data: data
    })
}

//删除用户接口
export function deleteUser(accountType: string,username: string, password: string) {
    const data={
        accountType:accountType,
        username:username,
        password:password
    }
    return request({
        url: '/deleteUser',
        headers: {
        },
        method: 'POST',
        data: data
    })
}
