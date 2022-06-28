const localStorageKeyName='recordList'
const recordListModel={
    clone(data:RecordItem[] | RecordItem){  // 克隆一份数据: 先变成字符串再还原回来
        return JSON.parse(JSON.stringify(data))
    },
    fetch(){  // 获取数据
        return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]
    },
    save(data:RecordItem[]){    // 保存数据
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(data))
    }
}

export default recordListModel