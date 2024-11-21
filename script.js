//GAS WebアプリのURL
const END_POINT = ""
//読み書きするスプレッドシートの指定
const PASS = "hpghifdghperht094u9r23geuhpoi12rr9pfheph"
const sheetNAME = "右シート"
document.getElementById("kousinButton").addEventListener("click", getCharaMemoToGAS, false)
//selectにキャラ名をセット
console.log("select chara set")
const selectCharaName = document.getElementById("chara-select")
const charalist_dic = {
  マリオ: "mario",
  ドンキー: "donkey_kong",
  リンク: "link",
  サムス: "samus",
  ダークサムス: "dark_samus",
  ヨッシー: "yoshi",
  カービィ: "kirby",
  フォックス: "fox",
  ピカチュウ: "pikachu",
  ルイージ: "luigi",
  ネス: "ness",
  CF: "captain_falcon",
  プリン: "jigglypuff",
  ピーチ: "peach",
  デイジー: "daisy",
  クッパ: "bowser",
  アイクラ: "ice_climbers",
  シーク: "sheik",
  ゼルダ: "zelda",
  ドクマリ: "dr_mario",
  ピチュー: "pichu",
  ファルコ: "falco",
  マルス: "marth",
  ルキナ: "lucina",
  こどもリンク: "young_link",
  ガノン: "ganondorf",
  ミュウツー: "mewtwo",
  ロイ: "roy",
  クロム: "chrom",
  ゲムヲ: "mr_game_and_watch",
  メタナイト: "meta_knight",
  ピット: "pit",
  ブラックピット: "dark_pit",
  ゼロサム: "zero_suit_samus",
  ワリオ: "wario",
  スネーク: "snake",
  アイク: "ike",
  ポケトレ: "pokemon_trainer",
  ディディー: "diddy_kong",
  リュカ: "lucas",
  ソニック: "sonic",
  デデデ: "king_dedede",
  ピクオリ: "olimar",
  ルカリオ: "lucario",
  ロボット: "rob",
  トゥーンリンク: "toon_link",
  ウルフ: "wolf",
  むらびと: "villager",
  ロックマン: "mega_man",
  フィットレ: "wii_fit_trainer",
  ロゼチコ: "rosalina_and_luma",
  リトマク: "little_mac",
  ゲッコウガ: "greninja",
  ミー格闘: "mii_fighter",
  ミー剣術: "mii_fighter",
  ミー射撃: "mii_fighter",
  パルテナ: "palutena",
  パックマン: "pac_man",
  ルフレ: "robin",
  シュルク: "shulk",
  クッパJr: "bowser_jr",
  ダックハント: "duck_hunt",
  リュウ: "ryu",
  ケン: "ken",
  クラウド: "cloud",
  カムイ: "corrin",
  ベヨネッタ: "bayonetta",
  インクリング: "inkling",
  リドリー: "ridley",
  シモン: "simon",
  リヒター: "richter",
  キングクルール: "king_k_rool",
  しずえ: "isabelle",
  ガオガエン: "incineroar",
  パックンフラワー: "piranha_plant",
  ジョーカー: "joker",
  勇者: "dq_hero",
  バンカズ: "banjo_and_kazooie",
  テリー: "terry",
  ベレトス: "byleth",
  ミェンミェン: "minmin",
  スティーブ: "steve",
  セフィロス: "sephiroth",
  ホムラ: "pyra",
  ヒカリ: "pyra",
  カズヤ: "kazuya",
  ソラ: "sora",
  main1: "mario",
  main2: "mario",
}
//辞書の英語名は背景画像を引っ張ってくる時に使用。ヒカリはpyraで合ってる。
const charalist_keyarr = Object.keys(charalist_dic) //辞書を配列化
console.log(charalist_keyarr)
charalist_keyarr.map((value) => {
  const option = document.createElement("option")
  option.value = value
  option.textContent = value
  selectCharaName.appendChild(option)
})
//ダークモードの処理
const btn = document.querySelector("#btn-mode") //チェックボックスの取得
const waku1_dark = document.getElementById("waku1")
btn.addEventListener("change", () => {
  // チェックした時の挙動
  if (btn.checked == true) {
    // ダークモード
    console.log("dark btn:" + btn.checked)
    waku1_dark.classList.remove("light-theme")
    waku1_dark.classList.add("dark-theme")
  } else {
    // ライトモード
    console.log("light btn:" + btn.checked)
    waku1_dark.classList.remove("dark-theme")
    waku1_dark.classList.add("light-theme")
  }
})

function getCharaMemoToGAS() {
  console.log("flag chara")
  //背景画像を削除
  const haikeiDIV = document.getElementById("haikeiGazo")
  haikeiDIV.style.backgroundImage = ""
  //waku1の高さを調整
  document.getElementById("waku1").style.height = "100px"
  //loadingの表示
  const loader = document.getElementById("loading")
  loader.classList.remove("loaded")
  //メモデータの取得、表示
  let memo_element = document.getElementById("memo")
  //メモをクリア
  if (memo_element.hasChildNodes()) {
    memo_element.innerHTML = ""
    console.log("memo clear")
  }
  //スプレッドシートにアクセス
  console.log("url: " + END_POINT)
  const num = document.getElementById("chara-select").selectedIndex
  console.log("num:" + num)
  const selectedName = document.getElementById("chara-select").options[num].value
  console.log("selected:" + selectedName)
  $.ajax({
    type: "GET",
    url: END_POINT,
    data: { data: selectedName, pass: PASS, sheetNAME: sheetNAME },
  })
    .done((result) => {
      // 成功した時の処理
      let dataObj = JSON.parse(result)
      let memo_element = document.getElementById("memo")
      //２次元配列を１次元に変換
      new_res = dataObj.flat()
      //メモ要素最後尾にnew_resを追加
      new_res.map((value) => {
        let new_element = document.createElement("p")
        new_element.textContent = value
        memo_element.appendChild(new_element)
      })
      //背景画像を変更
      //const haikeiURL = "https://www.smashbros.com/assets_v2/img/fighter/" + charalist_dic[selectedName] + "/ss_1.jpg";
      const haikeiURL = "https://www.smashbros.com/assets_v2/img/fighter/" + charalist_dic[selectedName] + "/main.png"
      haikeiDIV.style.backgroundImage = "url(" + haikeiURL + ")"
      console.log("haikeiURL:" + haikeiURL)
      //waku2のHeightを取得して下層に反映
      let waku2_h = document.getElementById("waku2").clientHeight
      console.log(waku2_h + "px")
      document.getElementById("haikeiGazo").style.height = waku2_h
      document.getElementById("waku1").style.height = waku2_h

      console.log("get done:" + result)
    })
    .fail((error) => {
      //失敗した時の処理
      alert("Error:" + JSON.stringify(error))
    })
    .always((data) => {
      //常にやる処理
      //loadingの非表示
      loader.classList.add("loaded")
    })
}
