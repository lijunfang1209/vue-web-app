# 前端开发规范

## 一、框架和UI选型
VUE3 + ElementUI + axios + Typescript
+ UI框架选择Element UI： 开源、版本更新迅速、使用者众多、API文档齐全、全面支持VUE3/TS。

<!-- ### 1. vue： -->

## 二、目录结构规范

<img src="https://raw.githubusercontent.com/lijunfang1209/vue-web-app/main/src/assets/projectStruct.png"/>

## 三、开发规范：
### 1. css开发规范
#### 概述
CSS发展至今，一直都没有namespace（命名空间）机制，也没有统一的官方推动标准；
导致项目在多人协同开发的过程，样式很容易被污染，造成页面展示错乱；
当然 各大组织框架，开源机构，针对这种现状也做了很多CSS规范来解决这些问题；
> BEM 组件化的 CSS 标准[链接](https://www.bemcss.com/)
> Atomic 原子性标准 [链接](https://juejin.cn/post/6926072695578689549)
> oocss 面向对象的css [链接](https://github.com/stubbornella/oocss/wiki)
#### 命名规范
提示：
css命名 和 JS不一样，JS是驼峰形式
css统一使用中划线隔离的方式,特别属性可以使用 -- 隔开
```css
//xx表示前缀（比如elementUI前端都是el--table），代表独一无二的基础前缀，比如可以用公司logo简写pl或者其他比较好点的命名。
.xx-table {} // xx表格
.xx-table-header {} // xx表格头部元素
.xx-table-footer {} // xx表格尾部
.xx-table-body {}  // xx表体部分
.xx-table-body .cell {}  // xx表体 单元格
.xx-table-body--hover {}  // xx表体 hover 
```

#### BEM标准
vue3在<strong>css模块标准</strong>这一块主要就是采用 BEM+SCSS+scoped的形式
BEM 分别代表着:Block(块)、Element(元素)、Modifier(修饰符),是一种组件化的 CSS 命名方法和规范
| Block | Element | Modifier |  
| - | - | - |
| Block(块,模块),主要场景有组件name | Element(元素)，主要指标签，自定义标签名 | Modifier 常用的属性，状态或行为 |
| 如 warehouse(仓库),area(区域查询)，customer(客户查询) | 如： header title, menu item, list item | 如: disabled, checked, fixed |
##### BEM优势
1. BEM使用广，非常符合现代流行前端互联网框架的特性，比如react风格，vue风格(opens new window)
2. 性能好： 可以不借助scoped隔离，也不需要穿透处理，也可以跟随模块组件懒加载
3. 维护方便： CSS跟随组件，结构清晰，多人协同开发不会样式冲突，不会因项目庞大而难维护，也方便媒体查询

> 注意
> BEM 是一种思想，我们可以根据实际情况做些改变，特别是配合sass的预编译特性，已经scoped作用域规则
> 我们可以很大程度上避免书写重复前缀的问题
> 同时因为page.scss使用了oocss的标准公共样式，组件里面需要自定义的样式很少

##### BEM的劣势
1. BEM规则太长，命名书写比较麻烦；
2. 一个DOM节点 需要绑很长的样式名，而且前缀重复
3. 相对Atomic规范，重复的CSS会比较多，项目整体的样式会比较大

##### 实际使用
> 场景1
> 组件外层有统一div情况， 可以配合scss特性不用手写前缀，虽然不算标准的BEM,目的是一样的
`wareHouseEdit` 组件 模块名即为组件名 驼峰转分隔符 `wareHouse-edit`
```js
return ()=>(
  <div class="wareHouse-edit">  //组建名:wareHouseEdit
  {basicFormHook()}
  {tableHook()}
  </div>)
```
css
```css
.wareHouse-edit{
  .wareHouse-table-toolBar{
    display:flex;
  }
}
```

#### 为啥不用Atomic 原子性

##### Atomic优势
1. 使用方便: 一套全局css可以多处使用
2. 体积小： 一套css 无需多个地方写重复的css,减少组件里面的重复css

##### Atomic劣势
1. 规范难：没有统一命名规范，多人协同约束苦难，标准的规范于2015年停止维护
2. 效率低：全局的css太大，导致系统首次加载变慢
3. 维护困难： 需求变更迭代困难，特别是针对媒体查询的时候
4. html臃肿： 一个dom节点需要绑定一堆class,dev-tools调试的麻烦

### 2. js开发规范
#### 变量规范
##### 概述
1.命名规范请认证阅读，约束不是目的，统一风格是为了方便代码阅读，见名知意，后期代码维护方便；
2.有些地方也相对开放，最终目的是要简洁明了，表意准确。

##### 关键字
关键字变量统一优先用es6+ 的let,const方式定义
使用`var`时需要注明原因和场景 

##### 变量名
1.使用<b>小驼峰</b>命名（第一个单词首个字母小写，其他单词首字母大写） 比如：fileName,vueRouter,orderList

```js
const fileName= ""
 const vueRouter= {}
 const orderList= []
 const useHook =()=>{}
```
2.使用单词全称，除非常用的<b>单词缩写</b>或<b>单词组合太长</b>的情况

>变量一般<b>不超过20个字符</b>，尽量表意准确
>单词组合太长，且<b>不好表达意图</b>的时候，可以根据单词重要性，缩略次要的单词

3.使用规范变量前后缀，不乱用<b>关键类型词</b>和<b>数据结构词</b>
比如：List,Obj,Array,Number,Num,Data,Str,Item等常用词
> <b>数组</b>
> 用 <b>List,Array</b> 等后缀或单词复数表示

```js
 //数组
 const orderList=[]
 const orderArray=[]
 let works=[]
```
> <b>对象</b>
> 用 <b>Object,Obj,Data，Info，Bean</b> 等后缀或<b>对象单词</b>表示

```js
 const userInfo={}
 const formData={}
 const orderObj={}
 let tomCat ={}
```
> <b>Map与Set</b>
> 用 <b>Map,Set</b> 等后缀分别表示Map,Set结构

```js
 const eventMap=new Map()
 const elementSet=new Set()
```
> <b>布尔</b>
> 用 <b>is,has,can</b> 等前缀,或有判断意图的单词表示
```js
 # 是不是 
 let isEmpty=true
 # 有没有
 let hasExport=true
 # 能不能
 let canOpen=true
 
 let show =fasle
```
> <b>数字</b>
> 用 <b>length,count,num,Number,Total</b> 等后缀,或表示<b>量词的单词</b>表示

```js
let fileLength= 1   
 const pollenCount =1 
 const rowTotal=100
 let limit=1
```
> <b>字符串</b>
> 用 <b>Str,String,Json</b> 等后缀或其他（字符串定义较开放）
```js
let name= '张三'
 //url参数串  
 const paramStr="name=ppy&age=1" 
 //json字符串
 const argJson="{ "l1": { "l1_1":[ "l1_1_1"]}}"
```

##### 函数名
1.使用小驼峰命名（第一个单词首个字母小写，其他单词首字母大写） 2.采用 动作特性开头的 组成结构 比如：
```js
 const toggleMenu= (status)=>{}
 const setToken= (token)=>{}
 const resetForm= (ref)=>{}   
```
> <b>通用情况</b>
> 在<b>不确定动作的单词</b>的函数情况，推荐使用<b>handle</b>开头
```js
 const handleFilter= ()=>{}
 const handleFile= ()=>{}
 const handleSearch= ()=>{} 
```
> <b>处理事件</b>
> 对于<b>明确组件事件动作</b>的情况，也可以用<b>事件key</b>开头 比<b>通用handle</b>更具有明确的含义
```js
//点击编辑 
 const clickEditBtn= ()=>{}
//keyup键盘enter键
 const keyupEnter= ()=>{}
//鼠标浮出菜单事件
 const mouseOverMenu= ()=>{}

```
### 3. git代码提交规范
##### 概述
git的协同方式基本上遵守 git flow 工作流，具体根据公司的情况实际操作有些不一样

##### commit 提交规范
程序每次提交<b>必须要写明原因</b>，且必须带 <b>特性前缀</b>
> 特性前缀 ：
```css
  feat : 表示新任务功能（前缀）
  fix : 修复bug
  docs : 文档改变
  style : 代码格式改变,样式改变
  refactor : 某个已有功能重构
  perf : 性能优化
  test : 增加测试
  build : 改变了build工具，webpack,vue.config等
  revert : 撤销上一次的 commit
  chore : 辅助程序，或者其他普通提交
```
提交格式
提交格式 = 特性前缀： + (#任务id) + 提交说明
比如：
```js
#修复图片上传的没有进度条的bug 
 fix:(#20343) 修复上传文件没有进度条
```
```js
 #完成列表任务
 feat:(#20343) 完成列表任务
```
```js
#更新ui组件依赖
 build: 升级ui组件0.1.0
```
