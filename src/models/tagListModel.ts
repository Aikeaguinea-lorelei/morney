const localStorageKeyName='tagList'
type TagListModel={  // 声明各数据的类型. xxx:(输入函数类型)=>输出参数类型
    data:string[]
    fetch:()=>string[]
    create:(name:string)=>'success' | 'duplicated'  // 输出字符串,'success'表示成功,'duplicated'表示name重复
    save:()=>void
}
const tagListModel:TagListModel={  // 把变量和上面type关联起来
    data:[],
    create(name){  // 上面写了类型这里就不用写了
        if(this.data.indexOf(name)<0){
            this.data.push(name)
            this.save()
            return 'success'
        }else{
            return 'duplicated'
        }
    },
    fetch(){  // 获取数据
        this.data=JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
        return this.data    // 最后不return的话会报错
    },
    save(){    // 保存数据
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))
    }
}

export default tagListModel