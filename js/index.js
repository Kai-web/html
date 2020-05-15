/* 首页js主程序文件 */

/* logo图标，响应点击事件 */
function logoEventFn() {
    var _logo_id = gId("logo_id");
    _logo_id.onclick = function () {
        console.log("这是logo图片");
    }
}

/* 生成导航条 */
function createNavFn() {
    /*首页导航栏url标签*/
    var _ul_id = gId("ul_id");

    for (var i = 0; i < _arr.length; i++) {
        var _li = cDom("li"); /*创建li标签,生成导航条的每一项*/
        var _a = cDom("a"); /*创建a标签*/
        _a.innerHTML = _arr[i].t; /*设置a标签的文字内容*/
        _a.setAttribute("href", _arr[i].url); /*设置a标签的属性值*/

        /* 判断是否有热卖信息 */
        if (_arr[i].isHot == 1) {
            var _i = cDom("i"); /* 创建i标签 */
            _i.innerHTML = "hot"; /* 设置i标签内容 */
            _a.innerHTML = _arr[i].t; /*设置a标签的文字内容*/
            _a.setAttribute("href", _arr[i].url); /*设置a标签的属性值*/
            _a.appendChild(_i); /* 将i标签插入到a标签中 */
            _li.appendChild(_a); /*把a标签插入到li标签中*/
            _ul_id.appendChild(_li); /*将li标签和其中包含的a标签一起插入到ul标签中*/
        }

        /* 判断生成下拉菜单 */
        if (_arr[i].pop_up.length > 0) {
            var _popUpDiv = cDom('div'); /* 创建div标签 ,下拉菜单的dom节点*/
            _popUpDiv.setAttribute('class', 'pop_up'); /* 设置div标签属性值（class名） */

            /* for循环嵌套中的内循环 */
            for (var j = 0; j < _arr[i].pop_up.length; j++) {
                var _popUp_p = cDom("p"); /* 创建p标签，弹出菜单的每一列表  */
                _popUp_p.innerHTML = _arr[i].pop_up[j]; /* 设置p标签文字内容 */
                _popUpDiv.appendChild(_popUp_p); /* 把p标签插入div标签中 */
            }
            _li.appendChild(_popUpDiv); /* 把div标签插入到li标签中 */

            /* 鼠标事件 移入显示沙发/柜子菜单栏 */
            _li.onmouseover = function () {
                this.children[0].style.display = "block"; /* 通过style属性，修改获取的子节点的样式 */
            }

            /* 鼠标事件 移出隐藏沙发/柜子菜单栏 */
            _li.onmouseout = function () {
                this.children[0].style.display = "none"; /* 通过style属性，修改获取的子节点的样式 */
            }
        }

        _li.appendChild(_a); /*把a标签插入到li标签中*/
        _ul_id.appendChild(_li); /*将li标签和其中包含的a标签一起插入到ul标签中*/
    }
}

/* 首页轮播图 */
function sliderFn() {
    /* 轮播图的ul地址 */
    var _ul_SliderId = gId("ul_SliderId");

    var _num = 0;

    /* 左右按钮 */
    var _left_btn_id = gId("left_btn_id");
    var _right_btn_id = gId("right_btn_id");

    var _slider_pointer = gId("slider_pointer"); /* 图片小圆点 */
    var _imgNum = _sliderArrData.length; /* 图片数量变量 */

    _ul_SliderId.style.width = _imgNum * 1142 + "px"; /* 轮播图宽度计算 */

    /* 生成dom节点 */
    var _html = "";
    for (var i = 0; i < _imgNum; i++) {
        /* console.log(_sliderArrData[i].img_url); */
        _html += "<li><img src =" + _sliderArrData[i].img_url + " /></li>";
    }
    /* console.log(gId("ul_SliderId")) */
    gId("ul_SliderId").innerHTML = _html;

    /* 生成轮播图的小圆点 */
    for (var i = 0; i < _imgNum; i++) {
        var _point_p = cDom("p");

        /* 第一个小圆点为默认选中 */
        if (i == 0) {
            _point_p.setAttribute("class", "focus_p");
        }
        _slider_pointer.appendChild(_point_p); /* 将p标签放入slider_pointer标签中 */
    }

    /* 计算小圆点父容器的宽度 */
    _slider_pointer.style.width = _imgNum * 25 + "px";
    _slider_pointer.style.marginLeft = -(_imgNum * 25) / 2 + "px";

    _left_btn_id.onclick = function () {
        if (_num > 0) {
            _num--;
        } else {
            _num = _imgNum - 1;
        }

        _ul_SliderId.style.left = -_num * 1142 + "px";
        pointerClsFn(_num);
    }
    _right_btn_id.onclick = function () {
        if (_num <= (_imgNum - 2)) {
            _num++;
        } else {
            _num = 0;
        }

        _ul_SliderId.style.left = -_num * 1142 + "px";
        pointerClsFn(_num);
    }

    /* 操作小圆点的class */
    function pointerClsFn(_num) {
        var _pCls = _slider_pointer.children;

        /*清除所有class里的属性  */
        for (var i = 0; i < _pCls.length; i++) {
            _pCls[i].setAttribute("class", "");
        }

        /* 再添加指定小圆点的class */
        _pCls[_num].setAttribute("class", "focus_p");
    }

    /* 小圆点点击事件 */
    var _pointerBtn = _slider_pointer.children;
    for (var i = 0; i < _pointerBtn.length; i++) {
        /* console.log(_pointerBtn[i]) */
        (function (i) {
            _pointerBtn[i].onclick = function () {
                /* console.log(this,i) */
                _num = i;
                _ul_SliderId.style.left = -_num * 1142 + "px";
                pointerClsFn(_num);
            }
        })(i);
    }
}