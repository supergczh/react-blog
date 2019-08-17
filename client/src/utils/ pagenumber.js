/**
  * @description: 通用分页
  * @param {type} 
  * @return: 
  */
pagination({
      total,
      current_page,
      per_page,
      callback
      }={}){

      return {
          onChange:(current,pageSize)=>{
              callback(current,pageSize)
          },
           // 每页数据条数改变时
          onShowSizeChange(current,pageSize) {
              callback(current,pageSize);
          },
          current:current_page,
          pageSize:Number(per_page),
          total: total,
          showTotal:()=>{
              return `共${total}条`
          },
          showQuickJumper:true,
          showSizeChanger:true,
          pageSizeOptions:['10', '20', '50', '100'],
          defaultPageSize: 10,
 
      }
  },
}