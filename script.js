// 全局变量定义
let registeredUsers = []; // 注册用户列表
let currentLoginUser = null; // 当前登录用户
let currentDeliveryMode = 'takeaway'; // 默认配送方式：takeaway(外卖) / selfPick(自提)
let shoppingCart = []; // 购物车列表
let userOrders = []; // 订单列表

// 收货地址信息
let userAddressInfo = {
    name: '',
    phone: '',
    detailAddress: '',
    get fullAddress() {
        if (!this.name || !this.phone || !this.detailAddress) {
            return '未设置';
        }
        return `${this.name} | ${this.phone} | ${this.detailAddress}`;
    }
};

// 菜品数据
const dishDatabase = [
    // 沙县小吃
    { id: 1, name: "飘香拌面", price: 6.00, store: "shaxian", storeName: "沙县小吃", icon: "images/拌面.jpg" },
    { id: 2, name: "鲜肉馄饨", price: 8.00, store: "shaxian", storeName: "沙县小吃", icon: "images/馄饨.jpg" },
    { id: 3, name: "蒸饺（10个）", price: 7.00, store: "shaxian", storeName: "沙县小吃", icon: "images/蒸饺.jpg" },
    { id: 4, name: "党参乌鸡汤", price: 12.00, store: "shaxian", storeName: "沙县小吃", icon: "images/乌鸡汤.jpg" },
    { id: 5, name: "福建炒粉干", price: 9.00, store: "shaxian", storeName: "沙县小吃", icon: "images/炒粉.jpg" },
    { id: 6, name: "卤味三拼", price: 15.00, store: "shaxian", storeName: "沙县小吃", icon: "images/三拼.jpg" },
    // 螺蛳粉
    { id: 7, name: "经典原味螺蛳粉", price: 15.00, store: "luosifen", storeName: "螺蛳粉", icon: "dish_imgs/lss.jpg" },
    { id: 8, name: "特辣螺蛳粉", price: 15.00, store: "luosifen", storeName: "螺蛳粉", icon: "dish_imgs/tllss.jpg" },
    { id: 9, name: "螺蛳粉加炸蛋", price: 18.00, store: "luosifen", storeName: "螺蛳粉", icon: "dish_imgs/lsszd.jpg" },
    { id: 10, name: "螺蛳粉加肥肠", price: 22.00, store: "luosifen", storeName: "螺蛳粉", icon: "dish_imgs/lssfc.jpg" },
    { id: 11, name: "螺蛳粉加鸡爪", price: 20.00, store: "luosifen", storeName: "螺蛳粉", icon: "dish_imgs/lssjz.jpg" },
    { id: 12, name: "干捞螺蛳粉", price: 16.00, store: "luosifen", storeName: "螺蛳粉", icon: "dish_imgs/ganlaolss.jpg" },
    // 家常大众菜
    { id: 13, name: "番茄炒蛋", price: 10.00, store: "homecook", storeName: "家常大众菜", icon: "dish_imgs/fqcd.jpg" },
    { id: 14, name: "青椒土豆丝", price: 8.00, store: "homecook", storeName: "家常大众菜", icon: "dish_imgs/qjtds.jpg" },
    { id: 15, name: "鱼香肉丝", price: 15.00, store: "homecook", storeName: "家常大众菜", icon: "dish_imgs/yxrs.jpg" },
    { id: 16, name: "宫保鸡丁", price: 16.00, store: "homecook", storeName: "家常大众菜", icon: "dish_imgs/gbjd.jpg" },
    { id: 17, name: "麻婆豆腐", price: 9.00, store: "homecook", storeName: "家常大众菜", icon: "dish_imgs/mpdf.jpg" },
    { id: 18, name: "清炒油麦菜", price: 7.00, store: "homecook", storeName: "家常大众菜", icon: "dish_imgs/qcymc.jpg" },
    // 滑蛋饭
    { id: 19, name: "滑蛋牛肉饭", price: 20.00, store: "eggRice", storeName: "滑蛋饭", icon: "dish_imgs/hdnrf.jpg" },
    { id: 20, name: "滑蛋鸡胸饭", price: 18.00, store: "eggRice", storeName: "滑蛋饭", icon: "dish_imgs/hdjxf.jpg" },
    { id: 21, name: "滑蛋叉烧饭", price: 22.00, store: "eggRice", storeName: "滑蛋饭", icon: "dish_imgs/hdcsf.jpg" },
    { id: 22, name: "滑蛋虾仁饭", price: 25.00, store: "eggRice", storeName: "滑蛋饭", icon: "dish_imgs/hdxrf.jpg" },
    { id: 23, name: "滑蛋腊肠饭", price: 16.00, store: "eggRice", storeName: "滑蛋饭", icon: "dish_imgs/hdlcf.jpg" },
    { id: 24, name: "滑蛋青菜饭", price: 12.00, store: "eggRice", storeName: "滑蛋饭", icon: "dish_imgs/hdqcf.jpg" },
    // 汉堡王
    { id: 25, name: "经典皇堡", price: 35.00, store: "burgerKing", storeName: "汉堡王", icon: "dish_imgs/jdhuangbao.jpg" },
    { id: 26, name: "狠霸王牛堡", price: 42.00, store: "burgerKing", storeName: "汉堡王", icon: "dish_imgs/hbwnb.jpg" },
    { id: 27, name: "王道薯条（中）", price: 12.00, store: "burgerKing", storeName: "汉堡王", icon: "dish_imgs/wdst.jpg" },
    { id: 28, name: "王道鸡块（5块）", price: 18.00, store: "burgerKing", storeName: "汉堡王", icon: "dish_imgs/wdjk.jpg" },
    { id: 29, name: "可口可乐（中）", price: 5.00, store: "burgerKing", storeName: "汉堡王", icon: "dish_imgs/kkkl.jpg" },
    { id: 30, name: "洋葱圈（中）", price: 10.00, store: "burgerKing", storeName: "汉堡王", icon: "dish_imgs/ycq.jpg" },
    // 煲仔饭
    { id: 31, name: "广式腊味煲仔饭", price: 18.00, store: "baozai", storeName: "煲仔饭", icon: "dish_imgs/gslwbzf.jpg" },
    { id: 32, name: "香菇滑鸡煲仔饭", price: 16.00, store: "baozai", storeName: "煲仔饭", icon: "dish_imgs/xghjbzf.jpg" },
    { id: 33, name: "蜜汁叉烧煲仔饭", price: 20.00, store: "baozai", storeName: "煲仔饭", icon: "dish_imgs/mzcsbzf.jpg" },
    { id: 34, name: "黑椒牛肉煲仔饭", price: 22.00, store: "baozai", storeName: "煲仔饭", icon: "dish_imgs/hjnrbzf.jpg" },
    { id: 35, name: "咸鱼鸡粒煲仔饭", price: 19.00, store: "baozai", storeName: "煲仔饭", icon: "dish_imgs/xyjlbzf.jpg" },
    { id: 36, name: "青菜香菇煲仔饭", price: 12.00, store: "baozai", storeName: "煲仔饭", icon: "dish_imgs/qcxgbzf.jpg" },
    // 水果摊
    { id: 37, name: "麒麟西瓜（切块）", price: 3.00, store: "fruit", storeName: "水果摊", icon: "dish_imgs/qlxg.jpg" },
    { id: 38, name: "红颜草莓（盒装）", price: 15.00, store: "fruit", storeName: "水果摊", icon: "dish_imgs/hync.jpg" },
    { id: 39, name: "赣南脐橙（2个）", price: 4.00, store: "fruit", storeName: "水果摊", icon: "dish_imgs/gnqc.jpg" },
    { id: 40, name: "红富士苹果（1个）", price: 5.00, store: "fruit", storeName: "水果摊", icon: "dish_imgs/hfsgp.jpg" },
    { id: 41, name: "广西香蕉（2根）", price: 2.00, store: "fruit", storeName: "水果摊", icon: "dish_imgs/gxjx.jpg" },
    { id: 42, name: "阳光玫瑰葡萄（半斤）", price: 10.00, store: "fruit", storeName: "水果摊", icon: "dish_imgs/ygmgpt.jpg" }
];

// 页面加载完成后立即执行所有初始化操作
window.addEventListener('DOMContentLoaded', function() {
    // 优先初始化登录注册（确保按钮事件先绑定）
    initLoginRegister();
    // 初始化其他功能
    initMainSystem();
    renderDishList();
    updateCartSummary();
    updateBottomCartBar();
    initUserCenter();
});

// 1. 初始化登录/注册模块（核心修复：强绑定事件，增加容错）
function initLoginRegister() {
    // 获取所有登录注册相关DOM元素
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');

    // 容错判断：如果元素不存在，打印错误信息
    if (!loginTab || !registerTab || !loginForm || !registerForm || !loginBtn || !registerBtn) {
        console.error("登录注册模块DOM元素缺失，请检查ID是否正确！");
        return;
    }

    // 标签切换事件
    loginTab.onclick = function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    };

    registerTab.onclick = function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
    };

    // 登录按钮点击事件（直接赋值，确保绑定生效）
    loginBtn.onclick = function() {
        const account = document.getElementById('loginAccount').value.trim();
        const pwd = document.getElementById('loginPwd').value.trim();
        const loginRoleRadios = document.getElementsByName('loginRole');
        let role = 'consumer';

        // 获取选中的角色
        for (let i = 0; i < loginRoleRadios.length; i++) {
            if (loginRoleRadios[i].checked) {
                role = loginRoleRadios[i].value;
                break;
            }
        }

        // 表单验证
        if (!account || !pwd) {
            alert('账号和密码不能为空！');
            return;
        }

        // 验证用户
        const targetUser = registeredUsers.find(user => 
            user.account === account && user.pwd === pwd && user.role === role
        );

        if (targetUser) {
            currentLoginUser = targetUser;
            document.getElementById('loginRegisterContainer').style.display = 'none';
            document.getElementById('mainSystem').style.display = 'block';
            updateUserCenterInfo();
            alert(`登录成功！欢迎${role === 'consumer' ? '消费者' : '管理员'}【${account}】`);
        } else {
            alert('账号/密码错误，或角色不匹配！');
        }
    };

    // 注册按钮点击事件（直接赋值，确保绑定生效）
    registerBtn.onclick = function() {
        const account = document.getElementById('regAccount').value.trim();
        const pwd = document.getElementById('regPwd').value.trim();
        const pwdConfirm = document.getElementById('regPwdConfirm').value.trim();
        const regRoleRadios = document.getElementsByName('regRole');
        let role = 'consumer';

        // 获取选中的角色
        for (let i = 0; i < regRoleRadios.length; i++) {
            if (regRoleRadios[i].checked) {
                role = regRoleRadios[i].value;
                break;
            }
        }

        // 表单验证
        if (!account || !pwd || !pwdConfirm) {
            alert('账号、密码和确认密码不能为空！');
            return;
        }
        if (pwd !== pwdConfirm) {
            alert('两次输入的密码不一致！');
            return;
        }
        if (registeredUsers.some(user => user.account === account)) {
            alert('该账号已存在！');
            return;
        }

        // 注册用户
        registeredUsers.push({ account, pwd, role });
        alert('注册成功！请切换到登录页面登录');
        loginTab.click(); // 自动切回登录页
        // 清空注册表单
        document.getElementById('regAccount').value = '';
        document.getElementById('regPwd').value = '';
        document.getElementById('regPwdConfirm').value = '';
    };
}

// 2. 初始化主系统页面
function initMainSystem() {
    // 导航栏切换
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.onclick = function() {
            navLinks.forEach(item => item.classList.remove('active'));
            pages.forEach(page => page.style.display = 'none');
            this.classList.add('active');
            const targetPageId = this.dataset.page + 'Page';
            document.getElementById(targetPageId).style.display = 'block';
        };
    });

    // 配送方式切换
    const takeawayCard = document.getElementById('takeawayCard');
    const selfPickCard = document.getElementById('selfPickCard');
    if (takeawayCard && selfPickCard) {
        takeawayCard.onclick = function() {
            takeawayCard.classList.add('active');
            selfPickCard.classList.remove('active');
            currentDeliveryMode = 'takeaway';
            document.querySelector('.nav-link[data-page="dish"]').click();
            updateCartSummary();
            updateBottomCartBar();
        };

        selfPickCard.onclick = function() {
            selfPickCard.classList.add('active');
            takeawayCard.classList.remove('active');
            currentDeliveryMode = 'selfPick';
            document.querySelector('.nav-link[data-page="dish"]').click();
            updateCartSummary();
            updateBottomCartBar();
        };
    }

    // 门店筛选菜品
    const storeFilterSelect = document.getElementById('storeFilterSelect');
    if (storeFilterSelect) {
        storeFilterSelect.onchange = function() {
            renderDishList(this.value);
        };
    }

    // 门店卡片点击
    const storeCards = document.querySelectorAll('.store-card');
    storeCards.forEach(card => {
        card.onclick = function() {
            const storeKey = this.dataset.store;
            document.querySelector('.nav-link[data-page="dish"]').click();
            if (storeFilterSelect) {
                storeFilterSelect.value = storeKey;
                renderDishList(storeKey);
            }
        };
    });

    // 结算订单
    const settleBtn = document.getElementById('settleBtn');
    if (settleBtn) {
        settleBtn.onclick = function() {
            if (shoppingCart.length === 0) {
                alert('购物车为空，无法结算订单！');
                return;
            }
            if (!currentLoginUser) {
                alert('请先登录后再结算订单！');
                return;
            }
            if (currentDeliveryMode === 'takeaway' && userAddressInfo.fullAddress === '未设置') {
                alert('请先在个人中心设置完整收货地址！');
                document.querySelector('.nav-link[data-page="userCenter"]').click();
                return;
            }

            // 生成订单
            const orderNo = 'SWX' + Date.now() + Math.floor(Math.random() * 999);
            const orderAmount = document.getElementById('orderTotal').innerText.replace('¥', '');
            const deliveryName = currentDeliveryMode === 'takeaway' ? '外卖配送' : '门店自提';
            const goodsDetail = shoppingCart.map(item => `${item.name}（${item.quantity}份，${item.feeType}：¥${item.extraFee.toFixed(2)}）`).join('，');
            const createTime = new Date().toLocaleString();

            userOrders.push({
                orderNo,
                goodsDetail,
                amount: orderAmount,
                delivery: deliveryName,
                status: 'pending',
                createTime
            });

            // 刷新订单列表
            renderOrderList();
            // 清空购物车
            shoppingCart = [];
            renderCartList();
            updateCartSummary();
            updateBottomCartBar();
            alert('订单结算成功！');
        };
    }
}

// 3. 渲染菜品列表
function renderDishList(storeKey = 'all') {
    const dishList = document.getElementById('dishList');
    if (!dishList) return;

    // 清空原有菜品
    dishList.innerHTML = '';

    // 筛选菜品
    let filteredDishes = dishDatabase;
    if (storeKey !== 'all') {
        filteredDishes = dishDatabase.filter(dish => dish.store === storeKey);
    }

    // 渲染菜品
    filteredDishes.forEach(dish => {
        const dishCard = document.createElement('div');
        dishCard.className = 'dish-card';
        dishCard.innerHTML = `
            <div class="dish-img">
                <img src="${dish.icon}" alt="${dish.name}">
            </div>
            <div class="dish-name">${dish.name}</div>
            <div class="dish-price">¥${dish.price.toFixed(2)}</div>
            <button class="add-cart-btn" data-dish-id="${dish.id}">加入购物车</button>
        `;
        dishList.appendChild(dishCard);

        // 加入购物车事件
        const addCartBtn = dishCard.querySelector('.add-cart-btn');
        addCartBtn.onclick = function() {
            const dishId = parseInt(this.dataset.dishId);
            const targetDish = dishDatabase.find(item => item.id === dishId);
            if (!targetDish) return;

            // 判断是否已在购物车
            const cartItemIndex = shoppingCart.findIndex(item => item.id === dishId);
            if (cartItemIndex > -1) {
                // 数量+1
                shoppingCart[cartItemIndex].quantity += 1;
            } else {
                // 新增购物车项
                shoppingCart.push({
                    id: targetDish.id,
                    name: targetDish.name,
                    price: targetDish.price,
                    storeName: targetDish.storeName,
                    icon: targetDish.icon,
                    quantity: 1,
                    extraFee: currentDeliveryMode === 'takeaway' ? 1.5 : 0.5,
                    feeType: currentDeliveryMode === 'takeaway' ? '配送费' : '打包费'
                });
            }

            // 刷新购物车
            renderCartList();
            updateCartSummary();
            updateBottomCartBar();
            alert(`${targetDish.name} 已加入购物车！`);
        };
    });
}

// 4. 渲染购物车列表
function renderCartList() {
    const cartTableBody = document.getElementById('cartTableBody');
    if (!cartTableBody) return;

    // 清空原有内容
    cartTableBody.innerHTML = '';

    // 渲染购物车项
    shoppingCart.forEach(item => {
        const subtotal = (item.price * item.quantity) + (item.extraFee * item.quantity);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <div class="cart-dish-img">
                    <img src="${item.icon}" alt="${item.name}">
                </div>
            </td>
            <td>${item.name}</td>
            <td>${item.storeName}</td>
            <td>¥${item.price.toFixed(2)}</td>
            <td>
                <button class="cart-operate-btn minus-btn" data-dish-id="${item.id}">-</button>
                ${item.quantity}
                <button class="cart-operate-btn plus-btn" data-dish-id="${item.id}">+</button>
            </td>
            <td>¥${item.extraFee.toFixed(2)}（${item.feeType}）</td>
            <td>¥${subtotal.toFixed(2)}</td>
            <td>
                <button class="cart-del-btn" data-dish-id="${item.id}">删除</button>
            </td>
        `;
        cartTableBody.appendChild(tr);

        // 减少数量事件
        const minusBtn = tr.querySelector('.minus-btn');
        minusBtn.onclick = function() {
            const dishId = parseInt(this.dataset.dishId);
            const cartItemIndex = shoppingCart.findIndex(cartItem => cartItem.id === dishId);
            if (cartItemIndex > -1) {
                if (shoppingCart[cartItemIndex].quantity > 1) {
                    shoppingCart[cartItemIndex].quantity -= 1;
                } else {
                    // 数量为1时，删除该项
                    shoppingCart.splice(cartItemIndex, 1);
                }
                renderCartList();
                updateCartSummary();
                updateBottomCartBar();
            }
        };

        // 增加数量事件
        const plusBtn = tr.querySelector('.plus-btn');
        plusBtn.onclick = function() {
            const dishId = parseInt(this.dataset.dishId);
            const cartItemIndex = shoppingCart.findIndex(cartItem => cartItem.id === dishId);
            if (cartItemIndex > -1) {
                shoppingCart[cartItemIndex].quantity += 1;
                renderCartList();
                updateCartSummary();
                updateBottomCartBar();
            }
        };

        // 删除事件
        const delBtn = tr.querySelector('.cart-del-btn');
        delBtn.onclick = function() {
            const dishId = parseInt(this.dataset.dishId);
            const cartItemIndex = shoppingCart.findIndex(cartItem => cartItem.id === dishId);
            if (cartItemIndex > -1) {
                shoppingCart.splice(cartItemIndex, 1);
                renderCartList();
                updateCartSummary();
                updateBottomCartBar();
            }
        };
    });
}

// 5. 渲染订单列表
function renderOrderList() {
    const orderTableBody = document.getElementById('orderTableBody');
    if (!orderTableBody) return;

    // 清空原有内容
    orderTableBody.innerHTML = '';

    // 渲染订单
    userOrders.forEach(order => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.orderNo}</td>
            <td>${order.goodsDetail}</td>
            <td>¥${order.amount}</td>
            <td>${order.delivery}</td>
            <td><span class="order-status status-pending">${order.status === 'pending' ? '待处理' : '已完成'}</span></td>
            <td>${order.createTime}</td>
        `;
        orderTableBody.appendChild(tr);
    });
}

// 6. 更新购物车汇总
function updateCartSummary() {
    const goodsTotalEl = document.getElementById('goodsTotal');
    const totalExtraFeeEl = document.getElementById('totalExtraFee');
    const orderTotalEl = document.getElementById('orderTotal');
    if (!goodsTotalEl || !totalExtraFeeEl || !orderTotalEl) return;

    // 计算商品总价
    let goodsTotal = 0;
    let totalExtraFee = 0;
    shoppingCart.forEach(item => {
        goodsTotal += item.price * item.quantity;
        totalExtraFee += item.extraFee * item.quantity;
    });
    const orderTotal = goodsTotal + totalExtraFee;

    // 更新显示
    goodsTotalEl.innerText = `¥${goodsTotal.toFixed(2)}`;
    totalExtraFeeEl.innerText = `¥${totalExtraFee.toFixed(2)}`;
    orderTotalEl.innerText = `¥${orderTotal.toFixed(2)}`;
}

// 7. 更新底部购物栏
function updateBottomCartBar() {
    const cartCountEl = document.getElementById('cartCount');
    const finalTotalPriceEl = document.getElementById('finalTotalPrice');
    if (!cartCountEl || !finalTotalPriceEl) return;

    // 计算商品总数
    let cartCount = 0;
    let finalTotal = 0;
    shoppingCart.forEach(item => {
        cartCount += item.quantity;
        finalTotal += (item.price * item.quantity) + (item.extraFee * item.quantity);
    });

    // 更新显示
    cartCountEl.innerText = cartCount;
    finalTotalPriceEl.innerText = `¥${finalTotal.toFixed(2)}`;
}

// 8. 初始化个人中心
function initUserCenter() {
    const editAddressBtn = document.getElementById('editAddressBtn');
    const addressModal = document.getElementById('addressModal');
    const cancelAddressBtn = document.getElementById('cancelAddressBtn');
    const saveAddressBtn = document.getElementById('saveAddressBtn');
    const changePwdBtn = document.getElementById('changePwdBtn');

    // 编辑地址事件
    if (editAddressBtn && addressModal) {
        editAddressBtn.onclick = function() {
            addressModal.style.display = 'flex';
            // 填充原有地址
            document.getElementById('receiverName').value = userAddressInfo.name || '';
            document.getElementById('receiverPhone').value = userAddressInfo.phone || '';
            document.getElementById('receiverDetailAddress').value = userAddressInfo.detailAddress || '';
        };
    }

    // 取消地址编辑
    if (cancelAddressBtn && addressModal) {
        cancelAddressBtn.onclick = function() {
            addressModal.style.display = 'none';
        };
    }

    // 保存地址事件
    if (saveAddressBtn && addressModal) {
        saveAddressBtn.onclick = function() {
            const receiverName = document.getElementById('receiverName').value.trim();
            const receiverPhone = document.getElementById('receiverPhone').value.trim();
            const receiverDetailAddress = document.getElementById('receiverDetailAddress').value.trim();

            if (!receiverName) {
                alert('请输入收货人姓名！');
                return;
            }
            const phoneReg = /^1[3-9]\d{9}$/;
            if (!phoneReg.test(receiverPhone)) {
                alert('请输入有效的11位手机号码！');
                return;
            }
            if (!receiverDetailAddress) {
                alert('请输入详细收货地址！');
                return;
            }

            // 更新地址
            userAddressInfo.name = receiverName;
            userAddressInfo.phone = receiverPhone;
            userAddressInfo.detailAddress = receiverDetailAddress;

            // 更新显示
            document.getElementById('userAddress').innerText = userAddressInfo.fullAddress;
            addressModal.style.display = 'none';
            alert('收货地址保存成功！');
        };
    }

    // 修改密码事件
    if (changePwdBtn) {
        changePwdBtn.onclick = function() {
            if (!currentLoginUser) {
                alert('请先登录后再修改密码！');
                return;
            }
            const oldPwd = document.getElementById('oldPwd').value.trim();
            const newPwd = document.getElementById('newPwd').value.trim();
            const confirmNewPwd = document.getElementById('confirmNewPwd').value.trim();

            if (!oldPwd || !newPwd || !confirmNewPwd) {
                alert('原密码、新密码和确认新密码不能为空！');
                return;
            }
            if (currentLoginUser.pwd !== oldPwd) {
                alert('原密码输入错误！');
                return;
            }
            if (newPwd !== confirmNewPwd) {
                alert('两次输入的新密码不一致！');
                return;
            }
            if (newPwd.length < 6) {
                alert('新密码长度不能少于6位！');
                return;
            }

            // 更新密码
            currentLoginUser.pwd = newPwd;
            // 同步更新注册用户列表中的密码
            const userIndex = registeredUsers.findIndex(user => user.account === currentLoginUser.account);
            if (userIndex > -1) {
                registeredUsers[userIndex].pwd = newPwd;
            }

            // 清空密码输入框
            document.getElementById('oldPwd').value = '';
            document.getElementById('newPwd').value = '';
            document.getElementById('confirmNewPwd').value = '';
            alert('密码修改成功！请重新登录');

            // 退出登录
            currentLoginUser = null;
            document.getElementById('mainSystem').style.display = 'none';
            document.getElementById('loginRegisterContainer').style.display = 'flex';
            // 清空登录表单
            document.getElementById('loginAccount').value = '';
            document.getElementById('loginPwd').value = '';
        };
    }
}

// 9. 更新个人中心信息
function updateUserCenterInfo() {
    const userAccountEl = document.getElementById('userAccount');
    const userRoleEl = document.getElementById('userRole');
    const userAddressEl = document.getElementById('userAddress');

    if (userAccountEl && currentLoginUser) {
        userAccountEl.innerText = currentLoginUser.account;
    }
    if (userRoleEl && currentLoginUser) {
        userRoleEl.innerText = currentLoginUser.role === 'consumer' ? '消费者' : '管理员';
    }
    if (userAddressEl) {
        userAddressEl.innerText = userAddressInfo.fullAddress;
    }
}