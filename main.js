let flag = false;
//プレイヤーデータ
let plyLv = 1;
let plyHp = 6;
let plyHpMax = 6;
let plyAtt = 1;
let plyHeal = 1;
let plyExp = 0;
let plyExpNext = 5;
let plyExpNeed = [5, 15, 50];
let plyImg = document.getElementById("plyImg");
//Plyerの配列
let plySt = [];
for(let i = 0; i < 7; i++) {
    plySt[i] = document.getElementById("plySt"+i);
}

//プレイヤー回復
plyImg.addEventListener("mousedown",() => {
  if(flag){
   plyImg.src = "img/playerC.png";
  }
});
plyImg.addEventListener("mouseup",() => {
    if(flag){
        plyImg.src = "img/playerA.png";
        plyHp += plyHeal;
        if(plyHp > plyHpMax){
            plyHp = plyHpMax;
            }
        plySt[2].textContent = "HP:" + plyHp;
    }
});
//数データ
let eneLv = 1;
let eneHp = 10;
let eneHpUp = 5;
let eneHpMax = 10;
let eneAtt0 = 2;
let eneKill0 = 0;
let eneExp0 = 1;
let eneCnt = 5;
let eneCntMax0 = 5;
let eneImg = document.getElementById("eneImg");

//Enemyの配列
let eneSt = [];
for(let i = 0; i < 5; i++) {
    eneSt[i] = document.getElementById("eneSt"+i);
}
//モンスターの配列
let eneImgASrc = [];
for(let i = 0; i < 10; i++) {
    eneImgASrc[i] = "img/enemyA"+i+".png";
}
let eneImgBSrc = [];
for(let i = 0; i < 10; i++) {
    eneImgBSrc[i] = "img/enemyB"+i+".png";
}
//モンスター名の配列
let eneName = ["ポニーテール","どんぐり","ポニーテールグレー","ラブコ","負け犬","ベイビー","ムンク","タレメ","うなぎ","ジャンボスペシャル"];

//敵を攻撃
eneImg.addEventListener("mousedown",() => {
    if(flag) {
        let imgSrc = eneImg.getAttribute('src');
        //画像切り替え処理
        for (let i = 0; i < 10 ; i++){
          if(imgSrc == eneImgASrc[i]){
            eneImg.setAttribute('src', eneImgBSrc[i]);
            break;
          }
        }
    }
});
eneImg.addEventListener("mouseup",() => {
    let imgSrc = eneImg.getAttribute('src');
    eneSt2.textContent = "HP:" + eneHp;
    if (flag) {
        //画像切り替え処理
        for (let i = 0; i < 10 ; i++){
          if(imgSrc == eneImgBSrc[i]){
            eneImg.setAttribute('src', eneImgASrc[i]);
            break;
          }
        }

        if(eneHp > 0) {
            eneHp -= plyAtt;
        } else {
            eneHp = eneHpMax;
            eneKill0++;
            eneSt[4].textContent = "倒した回数:" + eneKill0;
            //経験値の処理
            plyExp += eneExp0;
            plySt[5].textContent = "経験値:" + plyExp;
            plyExpNext -= eneExp0;
            //レベルアップの処理
            if(plyExpNext == 0){
                plyExpNext = plyExpNeed[plyLv];
                plyLv++;
                plySt[1].textContent = "レベル:" + plyLv;
                plyHpMax = plyLv * 2 + 6;
                plyHp = plyHpMax;
                plySt[2].textContent = "HP:" + plyHp;
                plyAtt++;
                plySt[3].textContent = "攻撃力:" + plyAtt;
                plyHeal++;
                plySt[4].textContent = "回復魔法:" + plyHeal;
            }
            plySt[6].textContent = "次のレベルまでの経験値" + plyExpNext + "ポイント";
            if(eneKill0 == 5){
                clearInterval(loop);
                flag = false;
                plySt[2].textContent = "HP:" + plyHp;
                eneSec.textContent = "ゲームクリア";
            }
        }
        eneSt[2].textContent = "HP:" + eneHp;
    }
});

let loop;
let eneSec = document.getElementById("eneSec");

//ゲームスタートボタンクリック
function gameStart(){
  flag = true;
  timerStart();  
}
//タイマー処理
function timerStart(){
    //敵が時間ごとに攻撃
    loop = setInterval(() => {
        if(eneCnt > 0) {
            eneCnt--;
            eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
        } else {
            plyImg.src = "img/playerB.png";
            plyHp -= eneAtt0;
            if(plyHp > 0) {
                plySt[2].textContent = "HP:" + plyHp;
            }else {
                plyHp = 0;
                clearInterval(loop);
                flag = false;
                plySt[2].textContent = "HP:" + plyHp;
                eneSec.textContent = "ゲームオーバー";
            }
            setTimeout(() => {
                if (flag){
                    eneCnt = eneCntMax0;
                    plyImg.src = "img/playerA.png";
                    eneSec.textContent = "モンスターの攻撃まで" + eneCnt + "秒";
                }
            },500);
        }
    },1000);
}


//「次のモンスター」クリック
right.addEventListener("mouseup",() => {
    if (flag) {
      let imgSrc = eneImg.getAttribute('src');
      //画像切り替え処理
      for (let i = 0; i < 9 ; i++){
        if(imgSrc == eneImgASrc[i]){
          eneImg.setAttribute('src', eneImgASrc[i+1]);
          eneSt[0].textContent = eneName[i+1];
          eneSt[2].textContent = "HP:" + eneHpMax*(i+2);
          eneLv++;
          break;
        }
      }
      eneSt[1].textContent = "レベル:" + eneLv;
    }
});

//「逃げる」クリック
left.addEventListener("mouseup",() => {
    if (flag) {
      let imgSrc = eneImg.getAttribute('src');
      //画像切り替え処理
      for (let i = 9; i > 0 ; i--){
        if(imgSrc == eneImgASrc[i]){
          eneImg.setAttribute('src', eneImgASrc[i-1]);
          eneSt[0].textContent = eneName[i-1];
          eneSt[2].textContent = "HP:" + eneHpMax*(i);
          eneLv--;
          break;
        }
      }
      eneSt[1].textContent = "レベル:" + eneLv;
    }
});

