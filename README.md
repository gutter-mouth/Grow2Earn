
# README (English)
## Project name
METAPLANTS
## About the project
We propose NFT linked with real plants.
Our NFT grow in the metaverse as real plants grow.  

## Problem we are trying to solve
We solve three challenges in the existing plant market at once.

### Challenges faced by collectors
Plants have an asset aspect that increases in value over time.
However, maintaining their value requires a high level of expertise and expensive equipment, making it difficult for collectors to enter this market.
This problem can be solved by providing NFT on a metaverse that is linked to real plants.

### Challenges faced by growers
The business of selling plants is expected to have a high rate of return by price increases due to growth.
On the other hand, it takes several years for cheap baby plants to grow into expensive grown plants.
Therefore, a long lead time is required until profits are generated.
Lead time can be shortened by selling to collectors as NFTs at the baby plant stage.

### Market Structural Challenges
Holding plants as assets has a high risk because of the low liquidity of the existing plant market.
This is caused by the following reasons.
 
* Regulations in various countries regarding exotic plants prevent cross-border EC.
* Potential owners do not necessarily have growing know-how.

We will solve these problems and build a more liquid market by developing a secondary market through NFT.

## Technologies used
### Contract
Grow2Earn.sol: 
We developed a contract for NFT with images and 3D models as metadata.
Only the NFT minter can grow NFT by updating the metadata as the real plants grow.
We also implemented the function to retrieve  past metadata  by recording the modified NFT metadata history on chain.
 
### Front End
A dedicated front end was developed using React so that users can easily access our original functions.
We developed a UI that allows users to access the following functions from the front end.

* mint NFT by specifying local image files and 3D model files
* update NFT metadata by specifying local image files, 3D model files, and tokenId.
* view a list of owned NFTs
//* check the update history of metadata of a specific NFT

### Metaverse Platform
As a demonstration environment for showing NFTs on the metaverse, we used oncyber, which allows 3D NFTs to be exhibited.

### Photogrammetry
Real plants were captured with a smartphone and a 3D model was restored using photogrammetry technology. 
AGISOFT METASHAPE (https://oakcorp.net/agisoft/) was used as the restoration software.

## Polygonscan link to smart contract
Testnet: https://mumbai.polygonscan.com/address/0x7b261ee52C98d2D68Cb832ae3D8E59867255f6Eb#code

Mainnet: https://polygonscan.com/address/0x0a9f1360D1166F2669625932532A0e07f7F11201#code
  

## Challenges faced
* Repeated trial and error was required to design the NFT service, which can make an impact on the real world. 
* It was hard to find a way to get a list of token ids from corresponding wallet addresses in the front end.
  
## Presentation slide
https://speakerdeck.com/player/0e9cb0db35d74318a27b20502159a66f

## Demo movie
https://drive.google.com/file/d/1lEeaB2QXfT3ZdBEBqZJPwHd2Q2osnznz/view

# README (日本語)

## プロジェクト名
METAPLANTS

## プロジェクトについて
観葉植物と1対1で紐づくNFTを発行し、リアルの植物と連動してメタバース上で成長する3D NFTを提案する。

## 解決しようとしている課題
既存の観葉植物市場における3つの課題を一挙に解決する。

### コレクターが抱える課題
観葉植物には、育成による楽しみに加えて時間とともに価値が上昇する資産としての側面がある。
しかし、資産価値を維持するために高度なノウハウや設備が必要となるため、コレクターの参入障壁が高いことが課題である。
リアルと連動するNFTをメタバース上で提供することにより、観葉植物をコレクションする敷居を下げることができる。

### 育成者が抱える課題
観葉植物の販売事業は、成長に伴う価格上昇により高い収益率が期待できる。
一方で、安価な子株が高価な大株に成長するまでに数年単位の時間が必要であり、収益を得るまでのリードタイムが長いことが課題である。
子株の段階でNFTとしてコレクターに植物を販売することにより、リードタイムを短縮することができる。
  
### マーケット構造が抱える課題
既存の観葉植物市場は下記の理由により流動性が低く、資産としての保有リスクが高いことが課題である。
* 国家間の外来植物規制によって越境ECができない
* 購入希望者が必ずしも育成ノウハウを持っているわけではない
  
NFTによる2次転売市場の開拓により、これらの課題を解決し、高い流動性を有する市場を構築することができる。

## 使用した技術
### コントラクト
Grow2Earn.sol: 
ERC721をベースに、画像と3Dモデルをメタデータに持つNFTコントラクトを作成した。
NFTの発行者はリアルの植物の成長に合わせてメタデータをアップデートすることによりメタバース上のバーチャルな植物を成長させることができる。
変更されたNFTのメタデータ履歴をオンチェーン上に記録することにより、過去のメタデータ履歴を取得する機能を実装した。
 
### フロントエンド
独自に追加した機能にユーザが簡単にアクセスできるように専用のフロントエンドをReactを用いて開発した。
フロントエンドから下記の機能を利用できるUIを開発した。

* ローカルの画像ファイル、3Dモデルファイルを指定してNFTをミント
* ローカルの画像ファイル、3Dモデルファイル、tokenIdを指定してNFTのメタデータをアップデート
* 所持NFTの一覧を閲覧
// * のNFTのメタデータのアップデート履歴を確認

### メタバースプラットフォーム
メタバース上でNFTを鑑賞するためのデモ環境として、3D NFTの展示が可能なoncyberを利用した。

### フォトグラメトリ
実物の植物（アガベ）をスマホで撮影しフォトグラメトリ技術により3次元モデルを復元した。復元ソフトにはAGISOFT METASHAPE（https://oakcorp.net/agisoft/）を使用した。


## スマートコントラクトのPolygonscanリンク
Testnet: https://mumbai.polygonscan.com/address/0x7b261ee52C98d2D68Cb832ae3D8E59867255f6Eb#code

Mainnet: https://polygonscan.com/address/0x0a9f1360D1166F2669625932532A0e07f7F11201#code

  

## 直面した課題
* フロントエンドからwallet addressに対応する保有idの一覧を取得する方法を見つけるまでに時間を要した
* 実世界にインパクトを与えられるNFTを実現するためにサービス内容の設計を繰り返し試行錯誤する必要があった

## プレゼンテーションスライド
https://speakerdeck.com/player/0e9cb0db35d74318a27b20502159a66f

## デモ動画
https://drive.google.com/file/d/1lEeaB2QXfT3ZdBEBqZJPwHd2Q2osnznz/view