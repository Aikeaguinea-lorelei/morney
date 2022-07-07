import createId from "@/lib/idCreateId"

const localStorageKeyName='tagList'
type Tag={
    id:string
    name:string
}
type TagListModel={  // 声明各数据的类型. xxx:(输入函数类型)=>输出参数类型
    data:Tag[]
    fetch:()=>Tag[]
    create:(name:string)=>'success' | 'duplicated'  // 输出字符串,'success'表示成功,'duplicated'表示name重复
    save:()=>void
    update:(id:string,name:string)=>'success' | 'not found' | 'duplicated'  // 三种结果:成功/找不到id/id重复
    remove:(id:string)=>boolean  // 删除有两种结果,成功或失败
}
const tagListModel:TagListModel={  // 把变量和上面type关联起来
    data:[],
    create(name){  // 上面写了类型这里就不用写了
        // 假设this.data=[{id:'1',name:'1'},{id:'2',name:'2'}]
        const names=this.data.map(item=>item.name)  // 则names=['1','2']
        if(names.indexOf(name)<0){
            const id=createId().toString()  // 引入使id递增的id生成器(lib/idCreateId.ts)
            this.data.push({id,name:name})   // 没有相同name的话就把那么name push进去
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
    update(id,name){
        const idList=this.data.map(item=>item.id)  // 得到当前data里面所有的id
        if(idList.indexOf(id)>=0){   // 如果上传的新id在现有data中,就
            const names=this.data.map(item=>item.name) // 得到当前data里面所有的name
            if(names.indexOf(name)>=0){
                return 'duplicated'  // 如果上传的新name在现有data中,就显示重复
            }else{
                const tag=this.data.filter(item=>item.id===id)[0]  // 否则,就找到和新id相同的那个tag
                tag.name=name   // 并让这个tag的name变为本次update的name
                tag.id=name 
                this.save()
                return 'success'
            }
        }else{
            return 'not found'  // 否则,就返回找不到这个id
        }
    },
    remove(id:string){
        let index=-1
        for(let i=0;i<this.data.length;i++){
            if(this.data[i].id===id){
                index=i  // 遍历,找到输入值对应的data,并删掉
                break
            }
        }
        this.data.splice(index,1)
        this.save()
        return true
    },
    save(){    // 保存数据
        window.localStorage.setItem(localStorageKeyName,JSON.stringify(this.data))
    },
}

export default tagListModel