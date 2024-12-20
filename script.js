//GAS WebアプリのURL
const END_POINT = "https://script.google.com/macros/s/AKfycbynkkPB9flNyDe3D1R7vYpvUFpFeWCLg-kkZggIHw02N-pzVNBXdIRRbPchUvpv-EhT/exec" //sample_spreadsheet_GAS
//読み書きするスプレッドシートの指定
const param_sheetNAME = "踏み台シート"
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
//console.log(charalist_keyarr)
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
  const memo_element = document.getElementById("memo")
  //メモをクリア
  if (memo_element.hasChildNodes()) {
    memo_element.innerHTML = ""
    console.log("memo clear")
  }
  //スプレッドシートにアクセス
  const num = document.getElementById("chara-select").selectedIndex
  const selectedName = document.getElementById("chara-select").options[num].value
  // console.log("url: " + END_POINT)
  // console.log("num:" + num)
  // console.log("selected:" + selectedName)

  //axiosでGetメソッドHTTPアクセス
  // const url = "https://qiita.com/api/v2/items"

  async function accessAsync() {
    try {
      const res = await axios.get(END_POINT, {
        params: {
          data: selectedName,
          sheetNAME: param_sheetNAME,
          // crossDomain: true,
        },
      })
      // 成功した時の処理
      const items = res.data.flat() //２次元配列の行列になっているで１次元に変換
      console.log("async success")
      console.log(items)
      const memo_element = document.getElementById("memo")
      //取得データをメモに追加
      for (const item of items) {
        const new_element = document.createElement("p")
        new_element.textContent = item
        memo_element.appendChild(new_element)
      }
      //背景画像を変更
      //const haikeiURL = "https://www.smashbros.com/assets_v2/img/fighter/" + charalist_dic[selectedName] + "/ss_1.jpg";
      const haikeiURL = "https://www.smashbros.com/assets_v2/img/fighter/" + charalist_dic[selectedName] + "/main.png"
      haikeiDIV.style.backgroundImage = "url(" + haikeiURL + ")"
      //haikeiDIV.style.backgroundColor = "green"
      console.log("haikeiURL:" + haikeiURL)
      console.log("url(" + haikeiURL + ")")
      //waku2のHeightを取得して下層に反映
      const waku2_h = document.getElementById("waku2").clientHeight
      console.log(waku2_h + "px")
      haikeiDIV.style.height = waku2_h + "px"
      document.getElementById("waku1").style.height = waku2_h + "px"
    } catch (error) {
      console.log(error)
    } finally {
      //loadingの非表示
      loader.classList.add("loaded")
    }
  }
  accessAsync()
}
