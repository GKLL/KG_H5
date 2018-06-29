/** 
*  @description： 全局loading效果
*  @author： 章臣乐
*  @data:  2018.5.24
*/
(function () {
	let inner = `
		<div class="loading-cell">
			<div class="spinner">
			  <div class="spinner-container container1">
			    <div class="circle1"></div>
			    <div class="circle2"></div>
			    <div class="circle3"></div>
			    <div class="circle4"></div>
			  </div>
			  <div class="spinner-container container2">
			    <div class="circle1"></div>
			    <div class="circle2"></div>
			    <div class="circle3"></div>
			    <div class="circle4"></div>
			  </div>
			  <div class="spinner-container container3">
			    <div class="circle1"></div>
			    <div class="circle2"></div>
			    <div class="circle3"></div>
			    <div class="circle4"></div>
			  </div>
			</div>
		</div>
	`
	let loading = document.createElement('div')
	loading.className = "loading"
	loading.innerHTML = inner
	document.body.append(loading);

	window.loading = loading
})()