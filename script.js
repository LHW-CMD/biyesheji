// 全局核心变量定义
let registeredUsers = [];
let currentLoginUser = null;
let currentDeliveryMode = 'takeaway';
let shoppingCart = [];
let userOrders = [];
let hasReceivedFirstCoupon = false;
let userCoupons = [];
let isUseCoupon = false;
let selectedCouponId = '';
// 新增：记录已领取的优惠券ID（确保每个优惠券仅能领取一次）
let receivedCouponIds = [];

// 收货地址信息（彻底修复保存问题，确保属性可持久化）
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

// 菜品数据库（完整菜品信息，包含图片路径占位）
const dishDatabase = [
    // 沙县小吃
    { id: 1, name: "飘香拌面", price: 6.00, store: "shaxian", storeName: "沙县小吃", icon: "images/拌面.jpg" },
    { id: 2, name: "鲜肉馄饨", price: 8.00, store: "shaxian", storeName: "沙县小吃", icon: "images/馄饨.jpg" },
    { id: 3, name: "蒸饺（10个）", price: 7.00, store: "shaxian", storeName: "沙县小吃", icon: "images/蒸饺.jpg" },
    { id: 4, name: "党参乌鸡汤", price: 12.00, store: "shaxian", storeName: "沙县小吃", icon: "images/乌鸡汤.jpg" },
    { id: 5, name: "福建炒粉干", price: 9.00, store: "shaxian", storeName: "沙县小吃", icon: "images/炒粉.jpg" },
    { id: 6, name: "卤味三拼", price: 15.00, store: "shaxian", storeName: "沙县小吃", icon: "images/三拼.jpg" },
    // 螺蛳粉
    { id: 7, name: "经典原味螺蛳粉", price: 15.00, store: "luosifen", storeName: "螺蛳粉", icon: "images/原味.jpg" },
    { id: 8, name: "特辣螺蛳粉", price: 15.00, store: "luosifen", storeName: "螺蛳粉", icon: "images/爆辣.jpg" },
    { id: 9, name: "螺蛳粉加炸蛋", price: 18.00, store: "luosifen", storeName: "螺蛳粉", icon: "images/炸蛋.jpg" },
    { id: 10, name: "螺蛳粉加肥肠", price: 22.00, store: "luosifen", storeName: "螺蛳粉", icon: "images/肚.jpg" },
    { id: 11, name: "螺蛳粉加鸡爪", price: 20.00, store: "luosifen", storeName: "螺蛳粉", icon: "images/鸡爪.jpg" },
    { id: 12, name: "干捞螺蛳粉", price: 16.00, store: "luosifen", storeName: "螺蛳粉", icon: "images/干捞.jpg" },
    // 家常大众菜
    { id: 13, name: "番茄炒蛋", price: 10.00, store: "homecook", storeName: "家常大众菜", icon: "images/番茄炒蛋.jpg" },
    { id: 14, name: "青椒土豆丝", price: 8.00, store: "homecook", storeName: "家常大众菜", icon: "images/青椒土豆丝.jpg" },
    { id: 15, name: "鱼香肉丝", price: 15.00, store: "homecook", storeName: "家常大众菜", icon: "images/鱼香肉丝.jpg" },
    { id: 16, name: "宫保鸡丁", price: 16.00, store: "homecook", storeName: "家常大众菜", icon: "images/宫保鸡丁.jpg" },
    { id: 17, name: "麻婆豆腐", price: 9.00, store: "homecook", storeName: "家常大众菜", icon: "images/麻婆豆腐.jpg" },
    { id: 18, name: "清炒油麦菜", price: 7.00, store: "homecook", storeName: "家常大众菜", icon: "images/油麦菜.jpg" },
    // 滑蛋饭
    { id: 19, name: "滑蛋牛肉饭", price: 20.00, store: "eggRice", storeName: "滑蛋饭", icon: "images/牛肉.jpg" },
    { id: 20, name: "滑蛋鸡胸饭", price: 18.00, store: "eggRice", storeName: "滑蛋饭", icon: "images/鸡胸.jpg" },
    { id: 21, name: "滑蛋叉烧饭", price: 22.00, store: "eggRice", storeName: "滑蛋饭", icon: "images/叉烧.jpg" },
    { id: 22, name: "滑蛋虾仁饭", price: 25.00, store: "eggRice", storeName: "滑蛋饭", icon: "images/虾仁.jpg" },
    { id: 23, name: "滑蛋腊肠饭", price: 16.00, store: "eggRice", storeName: "滑蛋饭", icon: "images/腊肠.jpg" },
    { id: 24, name: "滑蛋青菜饭", price: 12.00, store: "eggRice", storeName: "滑蛋饭", icon: "images/青菜.jpg" },
    // 汉堡王
    { id: 25, name: "经典皇堡", price: 35.00, store: "burgerKing", storeName: "汉堡王", icon: "images/汉堡.jpg" },
    { id: 26, name: "狠霸王牛堡", price: 42.00, store: "burgerKing", storeName: "汉堡王", icon: "images/牛肉汉堡.jpg" },
    { id: 27, name: "王道薯条（中）", price: 12.00, store: "burgerKing", storeName: "汉堡王", icon: "images/薯条.jpg" },
    { id: 28, name: "王道鸡块（5块）", price: 18.00, store: "burgerKing", storeName: "汉堡王", icon: "images/鸡块.jpg" },
    { id: 29, name: "可口可乐（中）", price: 5.00, store: "burgerKing", storeName: "汉堡王", icon: "images/可乐.jpg" },
    { id: 30, name: "洋葱圈（中）", price: 10.00, store: "burgerKing", storeName: "汉堡王", icon: "images/洋葱圈.jpg" },
    // 煲仔饭
    { id: 31, name: "广式腊味煲仔饭", price: 18.00, store: "baozai", storeName: "煲仔饭", icon: "images/叉烧煲仔饭.jpg" },
    { id: 32, name: "香菇滑鸡煲仔饭", price: 16.00, store: "baozai", storeName: "煲仔饭", icon: "images/香菇.jpg" },
    { id: 33, name: "蜜汁叉烧煲仔饭", price: 20.00, store: "baozai", storeName: "煲仔饭", icon: "images/叉烧煲仔.jpg" },
    { id: 34, name: "黑椒牛肉煲仔饭", price: 22.00, store: "baozai", storeName: "煲仔饭", icon: "images/黑椒牛肉.jpg" },
    { id: 35, name: "咸鱼鸡粒煲仔饭", price: 19.00, store: "baozai", storeName: "煲仔饭", icon: "images/咸鱼鸡.jpg" },
    { id: 36, name: "青菜香菇煲仔饭", price: 12.00, store: "baozai", storeName: "煲仔饭", icon: "images/青菜香菇.jpg" },
    // 水果摊
    { id: 37, name: "麒麟西瓜（切块）", price: 3.00, store: "fruit", storeName: "水果摊", icon: "images/西瓜.jpg" },
    { id: 38, name: "红颜草莓（盒装）", price: 15.00, store: "fruit", storeName: "水果摊", icon: "images/草莓.jpg" },
    { id: 39, name: "赣南脐橙（2个）", price: 4.00, store: "fruit", storeName: "水果摊", icon: "images/橙子.jpg" },
    { id: 40, name: "红富士苹果（1个）", price: 5.00, store: "fruit", storeName: "水果摊", icon: "images/苹果.jpg" },
    { id: 41, name: "广西香蕉（2根）", price: 2.00, store: "fruit", storeName: "水果摊", icon: "images/香蕉.jpg" },
    { id: 42, name: "阳光玫瑰葡萄（半斤）", price: 10.00, store: "fruit", storeName: "水果摊", icon: "images/阳光玫瑰.jpg" }
];

// 页面加载入口（所有初始化操作入口）
window.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
    initLoginRegister();
    initMainSystem();
    initUserCenter();
    initCouponFunction();
    initCouponSelect();
    renderDishList();
    renderCartList();
    renderOrderList();
    updateCartSummary();
    updateBottomCartBar();
    updateUserCenterInfo();

    // 登录状态判断，控制页面显隐
    if (currentLoginUser) {
        document.getElementById('loginRegisterContainer').style.display = 'none';
        document.getElementById('mainSystem').style.display = 'block';
    } else {
        document.getElementById('mainSystem').style.display = 'none';
        document.getElementById('loginRegisterContainer').style.display = 'flex';
    }
});

// 加载本地存储数据（持久化数据读取，包含已领取优惠券ID）
function loadFromLocalStorage() {
    const savedUsers = localStorage.getItem('registeredUsers');
    if (savedUsers) registeredUsers = JSON.parse(savedUsers);

    const savedCurrentUser = localStorage.getItem('currentLoginUser');
    if (savedCurrentUser) currentLoginUser = JSON.parse(savedCurrentUser);

    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) shoppingCart = JSON.parse(savedCart);

    const savedOrders = localStorage.getItem('userOrders');
    if (savedOrders) userOrders = JSON.parse(savedOrders);

    const savedAddress = localStorage.getItem('userAddressInfo');
    if (savedAddress) {
        const parsedAddress = JSON.parse(savedAddress);
        userAddressInfo.name = parsedAddress.name || '';
        userAddressInfo.phone = parsedAddress.phone || '';
        userAddressInfo.detailAddress = parsedAddress.detailAddress || '';
    }

    const savedCouponStatus = localStorage.getItem('hasReceivedFirstCoupon');
    if (savedCouponStatus) hasReceivedFirstCoupon = JSON.parse(savedCouponStatus);

    const savedCoupons = localStorage.getItem('userCoupons');
    if (savedCoupons) userCoupons = JSON.parse(savedCoupons);

    // 加载已领取的优惠券ID
    const savedReceivedCouponIds = localStorage.getItem('receivedCouponIds');
    if (savedReceivedCouponIds) receivedCouponIds = JSON.parse(savedReceivedCouponIds);
}

// 保存数据到本地存储（包含已领取优惠券ID，持久化领取状态）
function saveToLocalStorage() {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    localStorage.setItem('currentLoginUser', JSON.stringify(currentLoginUser));
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    localStorage.setItem('userOrders', JSON.stringify(userOrders));
    localStorage.setItem('userAddressInfo', JSON.stringify({
        name: userAddressInfo.name,
        phone: userAddressInfo.phone,
        detailAddress: userAddressInfo.detailAddress
    }));
    localStorage.setItem('hasReceivedFirstCoupon', JSON.stringify(hasReceivedFirstCoupon));
    localStorage.setItem('userCoupons', JSON.stringify(userCoupons));
    // 保存已领取的优惠券ID
    localStorage.setItem('receivedCouponIds', JSON.stringify(receivedCouponIds));
}

// 初始化登录注册功能（标签切换、登录验证、注册逻辑）
function initLoginRegister() {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');

    if (!loginTab || !registerTab || !loginForm || !registerForm || !loginBtn || !registerBtn) {
        console.error("登录注册DOM元素缺失");
        return;
    }

    // 登录/注册标签切换
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

    // 登录按钮点击事件
    loginBtn.onclick = function() {
        const account = document.getElementById('loginAccount').value.trim();
        const pwd = document.getElementById('loginPwd').value.trim();
        let role = 'consumer';

        const loginRoles = document.getElementsByName('loginRole');
        for (let i = 0; i < loginRoles.length; i++) {
            if (loginRoles[i].checked) {
                role = loginRoles[i].value;
                break;
            }
        }

        if (!account || !pwd) {
            alert('账号和密码不能为空！');
            return;
        }

        const targetUser = registeredUsers.find(user => 
            user.account === account && user.pwd === pwd && user.role === role
        );

        if (targetUser) {
            currentLoginUser = targetUser;
            saveToLocalStorage();
            document.getElementById('loginRegisterContainer').style.display = 'none';
            document.getElementById('mainSystem').style.display = 'block';
            updateUserCenterInfo();
            alert(`登录成功！欢迎${role === 'consumer' ? '消费者' : '管理员'}【${account}】`);
        } else {
            alert('账号/密码错误或角色不匹配！');
        }
    };

    // 注册按钮点击事件
    registerBtn.onclick = function() {
        const account = document.getElementById('regAccount').value.trim();
        const pwd = document.getElementById('regPwd').value.trim();
        const pwdConfirm = document.getElementById('regPwdConfirm').value.trim();
        let role = 'consumer';

        const regRoles = document.getElementsByName('regRole');
        for (let i = 0; i < regRoles.length; i++) {
            if (regRoles[i].checked) {
                role = regRoles[i].value;
                break;
            }
        }

        if (!account || !pwd || !pwdConfirm) {
            alert('账号、密码和确认密码不能为空！');
            return;
        }

        if (pwd !== pwdConfirm) {
            alert('两次密码不一致！');
            return;
        }

        const isExist = registeredUsers.some(user => user.account === account);
        if (isExist) {
            alert('账号已存在！');
            return;
        }

        registeredUsers.push({ account, pwd, role });
        saveToLocalStorage();
        alert('注册成功！请登录');
        loginTab.click();
        document.getElementById('regAccount').value = '';
        document.getElementById('regPwd').value = '';
        document.getElementById('regPwdConfirm').value = '';
    };
}

// 初始化主系统功能（导航切换、配送方式、门店筛选、结算订单）
function initMainSystem() {
    // 导航栏切换逻辑
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.onclick = function() {
            navLinks.forEach(item => item.classList.remove('active'));
            pages.forEach(page => page.style.display = 'none');
            this.classList.add('active');
            const targetPage = document.getElementById(this.dataset.page + 'Page');
            if (targetPage) targetPage.style.display = 'block';
            if (this.dataset.page === 'order') renderOrderList();
            if (this.dataset.page === 'cart') {
                renderCartList();
                updateCartSummary();
            }
        };
    });

    // 配送方式切换（外卖/自提）
    const takeawayCard = document.getElementById('takeawayCard');
    const selfPickCard = document.getElementById('selfPickCard');

    if (takeawayCard && selfPickCard) {
        takeawayCard.onclick = function() {
            currentDeliveryMode = 'takeaway';
            takeawayCard.classList.add('active');
            selfPickCard.classList.remove('active');
            updateCartItemExtraFee();
            renderCartList();
            updateCartSummary();
            updateBottomCartBar();
            document.querySelector('.nav-link[data-page="dish"]').click();
        };

        selfPickCard.onclick = function() {
            currentDeliveryMode = 'selfPick';
            selfPickCard.classList.add('active');
            takeawayCard.classList.remove('active');
            updateCartItemExtraFee();
            renderCartList();
            updateCartSummary();
            updateBottomCartBar();
            document.querySelector('.nav-link[data-page="dish"]').click();
        };
    }

    // 门店筛选下拉框事件
    const storeFilterSelect = document.getElementById('storeFilterSelect');
    if (storeFilterSelect) {
        storeFilterSelect.onchange = function() {
            renderDishList(this.value);
        };
    }

    // 门店卡片点击事件（热门门店+全部门店）
    const storeCards = document.querySelectorAll('.store-card, .hot-store-card');
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

    // 结算订单按钮事件（彻底修复金额为0、优惠券抵扣异常问题）
    const settleBtn = document.getElementById('settleBtn');
    if (settleBtn) {
        settleBtn.onclick = function() {
            if (shoppingCart.length === 0) {
                alert('购物车为空！');
                return;
            }
            if (!currentLoginUser) {
                alert('请先登录！');
                return;
            }
            if (currentDeliveryMode === 'takeaway' && userAddressInfo.fullAddress === '未设置') {
                alert('请先设置收货地址！');
                document.querySelector('.nav-link[data-page="userCenter"]').click();
                return;
            }

            // 强制类型转换计算，避免NaN或0值异常
            let goodsTotal = 0;
            let totalExtraFee = 0;
            shoppingCart.forEach(item => {
                goodsTotal += Number(item.price) * Number(item.quantity);
                totalExtraFee += Number(item.extraFee) * Number(item.quantity);
            });
            let originalOrderTotal = goodsTotal + totalExtraFee;
            if (originalOrderTotal <= 0) {
                alert('商品总价异常，请重新添加商品！');
                return;
            }

            let actualPayAmount = originalOrderTotal;
            let discountAmount = 0;

            // 优惠券抵扣逻辑（校验使用条件，修复5元优惠券不可用）
            if (isUseCoupon && selectedCouponId) {
                // 去重后查找优惠券，避免匹配重复数据
                const uniqueCoupons = [...new Map(userCoupons.map(coupon => [coupon.id, coupon])).values()];
                const selectedCoupon = uniqueCoupons.find(coupon => coupon.id === selectedCouponId);
                if (selectedCoupon) {
                    // 精准校验：5元无门槛券（minAmount=0）直接可用，其他券满额可用
                    if (originalOrderTotal >= selectedCoupon.minAmount) {
                        discountAmount = Number(selectedCoupon.amount);
                        actualPayAmount = Math.max(originalOrderTotal - discountAmount, 0.01); // 确保最小支付金额0.01元
                    } else {
                        alert(`该优惠券需满¥${selectedCoupon.minAmount.toFixed(2)}才可使用！当前总价¥${originalOrderTotal.toFixed(2)}`);
                        return;
                    }
                } else {
                    alert('所选优惠券无效！');
                    return;
                }
            }

            // 生成唯一订单编号
            const orderNo = 'SWX' + Date.now() + Math.floor(Math.random() * 999);
            const deliveryName = currentDeliveryMode === 'takeaway' ? '外卖配送' : '门店自提';
            const goodsDetail = shoppingCart.map(item => `${item.name}（${item.quantity}份，${item.feeType}：¥${item.extraFee.toFixed(2)}）`).join('，');
            const createTime = new Date().toLocaleString();

            // 添加订单到订单列表
            userOrders.push({
                orderNo,
                goodsDetail,
                amount: actualPayAmount.toFixed(2),
                originalAmount: originalOrderTotal.toFixed(2),
                discount: discountAmount.toFixed(2),
                delivery: deliveryName,
                status: 'pending',
                createTime
            });
            saveToLocalStorage();

            // 重置购物车和优惠券状态
            renderOrderList();
            shoppingCart = [];
            isUseCoupon = false;
            selectedCouponId = '';
            const couponUseCheckbox = document.getElementById('couponUseCheckbox');
            const couponSelect = document.getElementById('couponSelect');
            if (couponUseCheckbox) couponUseCheckbox.checked = false;
            if (couponSelect) {
                couponSelect.disabled = true;
                couponSelect.value = '';
            }
            saveToLocalStorage();
            renderCartList();
            updateCartSummary();
            updateBottomCartBar();
            alert(`订单结算成功！\n订单编号：${orderNo}\n原价：¥${originalOrderTotal.toFixed(2)}\n抵扣：¥${discountAmount.toFixed(2)}\n实际支付：¥${actualPayAmount.toFixed(2)}`);
        };
    }
}

// 初始化个人中心（彻底修复地址保存、密码修改、退出登录）
function initUserCenter() {
    const editAddressBtn = document.getElementById('editAddressBtn');
    const addressModal = document.getElementById('addressModal');
    const cancelAddressBtn = document.getElementById('cancelAddressBtn');
    const saveAddressBtn = document.getElementById('saveAddressBtn');
    const changePwdBtn = document.getElementById('changePwdBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userAddressEl = document.getElementById('userAddress');

    // 打开地址编辑弹窗
    if (editAddressBtn && addressModal) {
        editAddressBtn.onclick = function() {
            addressModal.style.display = 'flex';
            // 回显已保存的地址信息
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

    // 保存地址（核心修复：强制更新属性+立即持久化）
    if (saveAddressBtn && addressModal) {
        saveAddressBtn.onclick = function() {
            const name = document.getElementById('receiverName').value.trim();
            const phone = document.getElementById('receiverPhone').value.trim();
            const detail = document.getElementById('receiverDetailAddress').value.trim();

            // 表单校验
            if (!name) {
                alert('请输入收货人姓名！');
                return;
            }
            const phoneReg = /^1[3-9]\d{9}$/;
            if (!phoneReg.test(phone)) {
                alert('请输入有效的11位手机号码！');
                return;
            }
            if (!detail) {
                alert('请输入详细地址！');
                return;
            }

            // 强制更新地址信息
            userAddressInfo.name = name;
            userAddressInfo.phone = phone;
            userAddressInfo.detailAddress = detail;

            // 立即保存并更新DOM显示
            saveToLocalStorage();
            if (userAddressEl) {
                userAddressEl.innerText = userAddressInfo.fullAddress;
            }
            addressModal.style.display = 'none';
            alert('地址保存成功！');
            updateUserCenterInfo();
        };
    }

    // 修改密码功能
    if (changePwdBtn) {
        changePwdBtn.onclick = function() {
            if (!currentLoginUser) {
                alert('请先登录！');
                return;
            }

            const oldPwd = document.getElementById('oldPwd').value.trim();
            const newPwd = document.getElementById('newPwd').value.trim();
            const confirmPwd = document.getElementById('confirmNewPwd').value.trim();

            // 表单校验
            if (!oldPwd || !newPwd || !confirmPwd) {
                alert('请填写所有密码项！');
                return;
            }
            if (currentLoginUser.pwd !== oldPwd) {
                alert('原密码错误！');
                return;
            }
            if (newPwd !== confirmPwd) {
                alert('两次新密码不一致！');
                return;
            }
            if (newPwd.length < 6) {
                alert('新密码长度不能少于6位！');
                return;
            }

            // 更新密码并持久化
            currentLoginUser.pwd = newPwd;
            const userIndex = registeredUsers.findIndex(user => user.account === currentLoginUser.account);
            if (userIndex > -1) {
                registeredUsers[userIndex].pwd = newPwd;
            }
            saveToLocalStorage();
            // 清空输入框
            document.getElementById('oldPwd').value = '';
            document.getElementById('newPwd').value = '';
            document.getElementById('confirmNewPwd').value = '';
            alert('密码修改成功！请重新登录');
            logoutBtn.click();
        };
    }

    // 退出登录功能
    if (logoutBtn) {
        logoutBtn.onclick = function() {
            currentLoginUser = null;
            saveToLocalStorage();
            document.getElementById('mainSystem').style.display = 'none';
            document.getElementById('loginRegisterContainer').style.display = 'flex';
            document.getElementById('loginAccount').value = '';
            document.getElementById('loginPwd').value = '';
            alert('已退出登录！');
        };
    }
}

// 初始化优惠券功能（核心：所有优惠券仅可领取一次 + 修复5元优惠券不可用）
function initCouponFunction() {
    const receiveCouponBtn = document.getElementById('receiveCouponBtn');
    const couponStatus = document.getElementById('couponStatus');

    if (!receiveCouponBtn || !couponStatus) {
        console.error("首张优惠券DOM元素缺失");
        return;
    }

    // 初始化首张优惠券状态（基于已领取ID列表）
    if (receivedCouponIds.includes('coupon001')) {
        hasReceivedFirstCoupon = true;
        receiveCouponBtn.style.display = 'none';
        couponStatus.style.display = 'block';
    } else {
        hasReceivedFirstCoupon = false;
        receiveCouponBtn.style.display = 'block';
        couponStatus.style.display = 'none';
    }

    // 领取首张5元无门槛优惠券（仅可领取一次）
    receiveCouponBtn.onclick = function() {
        if (!currentLoginUser) {
            alert('请先登录！');
            return;
        }
        // 判断是否已领取（通过优惠券ID校验，确保仅领一次）
        if (receivedCouponIds.includes('coupon001')) {
            alert('该优惠券已领取，无法重复领取！');
            return;
        }

        hasReceivedFirstCoupon = true;
        const firstCoupon = { id: 'coupon001', amount: 5, minAmount: 0, name: '5元无门槛通用券' };
        // 添加优惠券并记录已领取ID
        userCoupons.push(firstCoupon);
        receivedCouponIds.push('coupon001');
        saveToLocalStorage();
        receiveCouponBtn.style.display = 'none';
        couponStatus.style.display = 'block';
        alert('成功领取5元无门槛券！');
        initCouponSelect();
    };

    // 领取其他优惠券（每个优惠券仅可领取一次）
    const otherCouponBtns = document.querySelectorAll('.coupon-card:not(#firstLoginCoupon) .receive-coupon-btn');
    otherCouponBtns.forEach((btn, index) => {
        // 初始化其他优惠券按钮状态（已领取则隐藏领取按钮）
        let couponId = '';
        if (index === 0) couponId = 'coupon002';
        else if (index === 1) couponId = 'coupon003';
        else couponId = 'coupon004';

        const statusEl = btn.nextElementSibling;
        if (receivedCouponIds.includes(couponId)) {
            btn.style.display = 'none';
            if (statusEl) statusEl.style.display = 'block';
        } else {
            btn.style.display = 'block';
            if (statusEl) statusEl.style.display = 'none';
        }

        btn.onclick = function() {
            if (!currentLoginUser) {
                alert('请先登录！');
                return;
            }

            let couponConfig = {};
            let currCouponId = '';
            if (index === 0) {
                currCouponId = 'coupon002';
                couponConfig = { id: currCouponId, amount: 10, minAmount: 30, name: '10元满30可用券' };
            } else if (index === 1) {
                currCouponId = 'coupon003';
                couponConfig = { id: currCouponId, amount: 8, minAmount: 20, name: '8元满20可用券' };
            } else {
                currCouponId = 'coupon004';
                couponConfig = { id: currCouponId, amount: 3, minAmount: 0, name: '3元无门槛券' };
            }

            // 判断是否已领取，确保仅可领取一次
            if (receivedCouponIds.includes(currCouponId)) {
                alert('该优惠券已领取，无法重复领取！');
                return;
            }

            const statusEl = this.nextElementSibling;
            if (statusEl) {
                this.style.display = 'none';
                statusEl.style.display = 'block';
            }

            // 添加优惠券并记录已领取ID
            userCoupons.push(couponConfig);
            receivedCouponIds.push(currCouponId);
            saveToLocalStorage();
            alert(`成功领取【${couponConfig.name}】！`);
            initCouponSelect();
        };
    });
}

// 初始化优惠券选择（修复5元优惠券不可用 + 去重显示）
function initCouponSelect() {
    const couponUseCheckbox = document.getElementById('couponUseCheckbox');
    const couponSelect = document.getElementById('couponSelect');
    const discountAmountEl = document.getElementById('discountAmount');
    const couponTipEl = document.getElementById('couponTip');

    if (!couponUseCheckbox || !couponSelect || !discountAmountEl) {
        console.warn("优惠券选择DOM元素缺失");
        return;
    }

    // 初始化状态
    couponUseCheckbox.checked = isUseCoupon;
    couponSelect.disabled = !isUseCoupon;
    couponSelect.innerHTML = '<option value="">请选择优惠券</option>';

    let hasAvailable = false;
    // 计算当前订单的实际总价（商品总价 + 额外费用，即用户需要支付的金额，用于判断优惠券满减）
    let goodsTotal = 0;
    let totalExtraFee = 0;
    shoppingCart.forEach(item => {
        goodsTotal += Number(item.price) * Number(item.quantity);
        totalExtraFee += Number(item.extraFee) * Number(item.quantity);
    });
    const currentOrderTotal = goodsTotal + totalExtraFee; // 关键：用实际订单总价判断

    // 优惠券去重
    const uniqueCoupons = [...new Map(userCoupons.map(coupon => [coupon.id, coupon])).values()];

    // 填充优惠券下拉列表
    if (uniqueCoupons.length > 0) {
        uniqueCoupons.forEach(coupon => {
            hasAvailable = true;
            const option = document.createElement('option');
            option.value = coupon.id;
            // 核心修复：用实际订单总价判断是否满足优惠券满减条件
            const isAvailable = currentOrderTotal >= coupon.minAmount;
            option.textContent = `${coupon.name}（抵扣¥${coupon.amount}）${isAvailable ? '[可用]' : '[不可用：未满金额]'}`;
            option.disabled = !isAvailable; // 满额则启用选择
            if (coupon.id === selectedCouponId) option.selected = true;
            couponSelect.appendChild(option);
        });
    }

    // 无可用优惠券提示
    if (!hasAvailable) {
        const option = document.createElement('option');
        option.value = "";
        option.textContent = "暂无可用优惠券";
        option.disabled = true;
        couponSelect.appendChild(option);
        couponUseCheckbox.checked = false;
        isUseCoupon = false;
        couponSelect.disabled = true;
        if (couponTipEl) couponTipEl.innerText = "暂无已领取优惠券，请先去领取！";
    } else {
        if (couponTipEl) couponTipEl.innerText = "请选择可用优惠券（标有不可用的未满使用条件）";
    }

    // 复选框切换事件
    couponUseCheckbox.onchange = function() {
        isUseCoupon = this.checked;
        couponSelect.disabled = !isUseCoupon;
        updateCartSummary();
    };

    // 下拉框选择事件
    couponSelect.onchange = function() {
        selectedCouponId = this.value;
        updateCartSummary();
    };

    updateCartSummary();
}

// 更新购物车商品额外费用（配送费/打包费，随配送方式切换）
function updateCartItemExtraFee() {
    const extraFee = currentDeliveryMode === 'takeaway' ? 1.5 : 0.5;
    const feeType = currentDeliveryMode === 'takeaway' ? '配送费' : '打包费';
    shoppingCart.forEach(item => {
        item.extraFee = extraFee;
        item.feeType = feeType;
    });
    saveToLocalStorage();
}

// 渲染菜品列表（支持门店筛选）
function renderDishList(storeKey = 'all') {
    const dishList = document.getElementById('dishList');
    if (!dishList) {
        console.error("菜品列表DOM元素缺失");
        return;
    }

    dishList.innerHTML = '';
    let filteredDishes = dishDatabase;
    // 按门店筛选菜品
    if (storeKey !== 'all') {
        filteredDishes = dishDatabase.filter(dish => dish.store === storeKey);
    }

    // 无菜品时的提示
    if (filteredDishes.length === 0) {
        dishList.innerHTML = '<div style="text-align:center;padding:50px 0;color:#666;">该门店暂无菜品</div>';
        return;
    }

    // 循环生成菜品卡片
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

        // 加入购物车按钮事件
        dishCard.querySelector('.add-cart-btn').onclick = function() {
            const dishId = parseInt(this.dataset.dishId);
            const targetDish = dishDatabase.find(item => item.id === dishId);
            if (!targetDish) return;

            // 判断商品是否已在购物车中，存在则增加数量，不存在则添加
            const cartIndex = shoppingCart.findIndex(item => item.id === dishId);
            if (cartIndex > -1) {
                shoppingCart[cartIndex].quantity += 1;
            } else {
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

            saveToLocalStorage();
            renderCartList();
            updateCartSummary();
            updateBottomCartBar();
            alert(`${targetDish.name} 已加入购物车！`);
        };
    });
}

// 渲染购物车列表
function renderCartList() {
    const cartTableBody = document.getElementById('cartTableBody');
    if (!cartTableBody) {
        console.error("购物车表格DOM元素缺失");
        return;
    }

    cartTableBody.innerHTML = '';
    // 购物车为空时的提示
    if (shoppingCart.length === 0) {
        cartTableBody.innerHTML = '<tr><td colspan="8" style="padding:50px 0;color:#666;text-align:center;">购物车为空</td></tr>';
        return;
    }

    // 循环生成购物车商品行
    shoppingCart.forEach(item => {
        const subtotal = (Number(item.price) * Number(item.quantity)) + (Number(item.extraFee) * Number(item.quantity));
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

        // 减少商品数量按钮事件
        tr.querySelector('.minus-btn').onclick = function() {
            const dishId = parseInt(this.dataset.dishId);
            const cartIndex = shoppingCart.findIndex(c => c.id === dishId);
            if (cartIndex > -1) {
                if (shoppingCart[cartIndex].quantity > 1) {
                    shoppingCart[cartIndex].quantity -= 1;
                } else {
                    // 数量为1时，删除该商品
                    shoppingCart.splice(cartIndex, 1);
                }
                saveToLocalStorage();
                renderCartList();
                updateCartSummary();
                updateBottomCartBar();
            }
        };

        // 增加商品数量按钮事件
        tr.querySelector('.plus-btn').onclick = function() {
            const dishId = parseInt(this.dataset.dishId);
            const cartIndex = shoppingCart.findIndex(c => c.id === dishId);
            if (cartIndex > -1) {
                shoppingCart[cartIndex].quantity += 1;
                saveToLocalStorage();
                renderCartList();
                updateCartSummary();
                updateBottomCartBar();
            }
        };

        // 删除商品按钮事件
        tr.querySelector('.cart-del-btn').onclick = function() {
            const dishId = parseInt(this.dataset.dishId);
            const cartIndex = shoppingCart.findIndex(c => c.id === dishId);
            if (cartIndex > -1) {
                shoppingCart.splice(cartIndex, 1);
                saveToLocalStorage();
                renderCartList();
                updateCartSummary();
                updateBottomCartBar();
            }
        };
    });
}

// 渲染订单列表
function renderOrderList() {
    const orderTableBody = document.getElementById('orderTableBody');
    if (!orderTableBody) {
        console.error("订单表格DOM元素缺失");
        return;
    }

    orderTableBody.innerHTML = '';
    // 无订单时的提示
    if (userOrders.length === 0) {
        orderTableBody.innerHTML = '<tr><td colspan="6" style="padding:50px 0;color:#666;text-align:center;">暂无订单</td></tr>';
        return;
    }

    // 倒序显示订单（最新订单在前）
    const reversedOrders = [...userOrders].reverse();
    reversedOrders.forEach(order => {
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

// 更新购物车汇总信息（同步修复5元优惠券抵扣计算）
function updateCartSummary() {
    const goodsTotalEl = document.getElementById('goodsTotal');
    const totalExtraFeeEl = document.getElementById('totalExtraFee');
    const orderTotalEl = document.getElementById('orderTotal');
    const discountAmountEl = document.getElementById('discountAmount');
    const discountAmountShowEl = document.getElementById('discountAmountShow');
    const couponTipEl = document.getElementById('couponTip');

    if (!goodsTotalEl || !totalExtraFeeEl || !orderTotalEl || !discountAmountEl || !discountAmountShowEl) {
        console.error("购物车汇总DOM元素缺失");
        return;
    }

    // 强制类型转换计算，避免NaN或0值异常
    let goodsTotal = 0;
    let totalExtraFee = 0;
    shoppingCart.forEach(item => {
        goodsTotal += Number(item.price) * Number(item.quantity);
        totalExtraFee += Number(item.extraFee) * Number(item.quantity);
    });
    let originalOrderTotal = goodsTotal + totalExtraFee;
    let discountAmount = 0;

    // 优惠券抵扣逻辑（修复5元无门槛券抵扣异常）
    if (isUseCoupon && selectedCouponId) {
        // 去重后查找优惠券
        const uniqueCoupons = [...new Map(userCoupons.map(coupon => [coupon.id, coupon])).values()];
        const selectedCoupon = uniqueCoupons.find(coupon => coupon.id === selectedCouponId);
        
        if (selectedCoupon) {
            // 5元券（minAmount=0）直接抵扣，其他券满额抵扣
            if (originalOrderTotal >= selectedCoupon.minAmount) {
                discountAmount = Number(selectedCoupon.amount);
                if (couponTipEl) {
                    couponTipEl.innerText = `已选择【${selectedCoupon.name}】，抵扣¥${discountAmount.toFixed(2)}`;
                }
            } else {
                discountAmount = 0;
                if (couponTipEl) {
                    couponTipEl.innerText = `【${selectedCoupon.name}】不可用：需满¥${selectedCoupon.minAmount.toFixed(2)}`;
                }
            }
        } else {
            discountAmount = 0;
            if (couponTipEl) {
                couponTipEl.innerText = "所选优惠券无效！";
            }
        }
    } else {
        discountAmount = 0;
        if (couponTipEl) {
            couponTipEl.innerText = "未使用优惠券，可勾选使用！";
        }
    }

    const actualOrderTotal = Math.max(originalOrderTotal - discountAmount, 0.01);

    // 更新所有汇总信息DOM
    goodsTotalEl.innerText = `¥${goodsTotal.toFixed(2)}`;
    totalExtraFeeEl.innerText = `¥${totalExtraFee.toFixed(2)}`;
    discountAmountEl.innerText = `优惠金额：-¥${discountAmount.toFixed(2)}`;
    discountAmountShowEl.innerText = `优惠金额：-¥${discountAmount.toFixed(2)}`;
    orderTotalEl.innerText = `¥${actualOrderTotal.toFixed(2)}`;
}

// 更新底部购物栏（商品数量、总价显隐）
function updateBottomCartBar() {
    const bottomCartBar = document.getElementById('bottomCartBar');
    const cartCountEl = document.getElementById('cartCount');
    const finalTotalPriceEl = document.getElementById('finalTotalPrice');

    if (!bottomCartBar || !cartCountEl || !finalTotalPriceEl) {
        console.error("底部购物栏DOM元素缺失");
        return;
    }

    // 计算购物车商品总数和最终总价
    let cartCount = 0;
    let goodsTotal = 0;
    let totalExtraFee = 0;
    shoppingCart.forEach(item => {
        cartCount += Number(item.quantity);
        goodsTotal += Number(item.price) * Number(item.quantity);
        totalExtraFee += Number(item.extraFee) * Number(item.quantity);
    });
    let originalTotal = goodsTotal + totalExtraFee;
    let discountAmount = 0;

    // 优惠券抵扣（同步修复5元券计算）
    if (isUseCoupon && selectedCouponId) {
        const uniqueCoupons = [...new Map(userCoupons.map(coupon => [coupon.id, coupon])).values()];
        const selectedCoupon = uniqueCoupons.find(coupon => coupon.id === selectedCouponId);
        if (selectedCoupon && originalTotal >= selectedCoupon.minAmount) {
            discountAmount = Number(selectedCoupon.amount);
        }
    }

    const finalTotal = Math.max(originalTotal - discountAmount, 0.01);

    // 更新DOM显示
    cartCountEl.innerText = cartCount;
    finalTotalPriceEl.innerText = `¥${finalTotal.toFixed(2)}`;

    // 购物车有商品时显示底部栏，否则隐藏
    if (cartCount > 0) {
        bottomCartBar.style.display = 'flex';
    } else {
        bottomCartBar.style.display = 'none';
    }
}

// 更新个人中心信息（账号、角色、地址）
function updateUserCenterInfo() {
    const userAccountEl = document.getElementById('userAccount');
    const userRoleEl = document.getElementById('userRole');
    const userAddressEl = document.getElementById('userAddress');

    if (!userAccountEl || !userRoleEl || !userAddressEl) {
        console.error("个人中心DOM元素缺失");
        return;
    }

    // 更新账号和角色
    if (currentLoginUser) {
        userAccountEl.innerText = currentLoginUser.account;
        userRoleEl.innerText = currentLoginUser.role === 'consumer' ? '消费者' : '管理员';
    } else {
        userAccountEl.innerText = '未登录';
        userRoleEl.innerText = '未知';
    }
    // 更新收货地址
    userAddressEl.innerText = userAddressInfo.fullAddress;
}