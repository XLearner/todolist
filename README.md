# todolist
This is a memo that can record the user's schedule. Welcome to use.
<br>
## The problem i met during the period of programming.<br>
*问题1： 不能够动态的给delete，checkbox绑定事件。<br>
  *已解决delete的动态绑定(通过绑定在document上实现)，<br>
  * 但checkbox的动态绑定未能完成。<br>
  *-已解决。<br>
*问题2： 将事情加入到localstorage后无法读取。 <br>
  *-已解决<br>
*问题3： 刷新页面时加载localstorage中的数据，并按类型放置。<br>
  *-经考虑，决定更改数据的存储方式为JSON，设置两个值为-title-done。前者表示内容，后者表示是否完成。<br>
