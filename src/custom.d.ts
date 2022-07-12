// type都放这里来
type RecordItem={
    tags:string[]
    notes:string
    type:string
    total:number
    amount:number  // 金额
    createdAt?:string  // 创建一个记录日期的数据
}
type RootState={
    recordList:RecordItem[]
    tagList:Tag[]
    currentTag?:Tag
}
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
interface Window{  // 此处声明tagList. 因为这个文件在比较高层的地方,在此处定义的话方便分组件调用
    store:{
        // tagList: Tag[]
        // createTag:(name:string)=>void
        // findTag:(id:string)=>Tag | undefined 
        // removeTag:(id:string)=>Boolean
        // updateTag:(id:string,name:string)=>'success' | 'not found' | 'duplicated' 
        // recordList:RecordItem[]
        // createRecord:(record:RecordItem)=>void    
    }
}