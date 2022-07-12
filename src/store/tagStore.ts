import tagListModel from "@/models/tagListModel"

export default{
        // tag store:
    // 全局引入数据,方便money.vue和labels.vue调用 (直接window.tagList就能调用)
    // 要在custom.d.ts里面声明一下,才能使用window.tagList
    tagList:tagListModel.fetch(),
    refreshTags() {  // 获取最新数据
      this.tagList = tagListModel.fetch()
    },
    findTag(id:string){  // 箭头函数和this不能共存
      return this.tagList.filter(t=>t.id===id)[0]  // 在所有tags中筛选id是当前id的tag
    },
    createTag:(name:string)=>{
      // 拿到tagListModel里定义的name值(name只能是 success或者duplicated)
      const message=tagListModel.create(name)
      if(message==='duplicated'){
        window.alert('标签名重复')
      }else if(message==='success'){
        window.alert('标签添加成功')
      }
      location.reload()
    },
    removeTag:(id:string)=>{
      return tagListModel.remove(id)
      // this.$router.back()  // 删完之后自动返回上一级
    },
    updateTag:(id:string,name:string)=>{
      return tagListModel.update(id,name)
    }
}