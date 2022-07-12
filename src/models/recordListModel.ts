import clone from "@/lib/clone"

const localStorageKeyName='recordList'
const recordListModel={
    data:[] as RecordItem[],
    create(record:RecordItem){
        const record2:RecordItem=clone(record)  // 深拷贝得到record2
        record2.createdAt=new Date().toISOString()  // 单独定义一下记录日期的数据
        this.data.push(record2)
        this.save()
    },
    fetch(){  // 获取数据
        this.data=JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[]
        return this.data 
    },
    save(){    // 保存数据
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))
    }
}

export default recordListModel