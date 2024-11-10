<script setup>
import {ref, reactive, computed} from "vue";

const author = reactive({
  name: "张三",
  books: [
    {id: 1, title: "vue1", year: 2010, price: 10},
    {id: 2, title: "vue2", year: 2011, price: 20},
    {id: 3, title: "vue3", year: 2012, price: 30},
    {id: 4, title: "vue4", year: 2013, price: 40},
  ]
})
const bookPriceFilter = ref(20)
const newBooks = computed(() => {
  return author.books.filter(book => book.price <= bookPriceFilter.value)
})

</script>
<template>
  <el-input
      v-model="bookPriceFilter"
  ></el-input>
<!--  这是 Element Plus 中的输入框组件，用于接收用户的输入。
v-model 是 Vue 提供的双向数据绑定指令。
它会将输入框的值与 bookPriceFilter 这个数据属性绑定在一-->
  <el-table :data="newBooks" style="width: 100%;"
  >
<!--    <el-table>:
          这是 Element Plus 中的表格组件，用于显示数据列表。-->
<!--      :data 属性-->
<!--      :data="newBooks":-->
<!--      这里使用了 Vue 的属性绑定语法（冒号 : 表示绑定），将 newBooks 作为表格的数据源。-->
<!--      newBooks 是一个计算属性，它返回经过过滤后的书籍列表，只包含价格低于或等于 bookPriceFilter 的书籍。-->
    <el-table-column
        prop="title"
        label="书名"
    ></el-table-column>
    <el-table-column
        prop="price"
        label="价格"
    ></el-table-column>
    <el-table-column
        prop="year"
        label="出版日期"
    ></el-table-column>
<!--    prop 属性指定了该列对应的数据字段。在这个例子中，它指向书籍对象中的 title 属性。-->
<!--    当表格渲染时，它会自动从每一本书的数据中提取 title 的值并显示在这一列中
label 属性用于设置列的标题，在表格的表头中显示。这里设置为“书名”，表示该列展示的是书籍的名称-->
  </el-table>

</template>

<style scoped>

</style>