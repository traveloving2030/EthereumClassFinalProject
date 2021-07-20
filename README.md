# EthereumClassFinalProject

## 실행순서

- Genesis.json 파일은 다음과 같이 설정합니다. (zip 파일 다운로드)
    - geth --datadir test init genesis.json

```json
{
  "config": {
    "chainId": 1234,
    "homesteadBlock": 1,
    "eip150Block": 2,
    "eip155Block": 3,
    "eip158Block": 3,
    "byzantiumBlock": 4,
    "constantinopleBlock": 5,
    "ethash": {}
  },
  "nonce": "0x00",
  "timestamp": "0x00",
  "extraData": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit": "0x47b760",
  "difficulty": "0x50000",
  "mixHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x0000000000000000000000000000000000000000",
  "alloc": {},
  "number": "0x0",
  "gasUsed": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

- Geth 버전은 1.8.23-stable 버전으로 합니다. (zip 파일 다운로드)
    - geth --networkid 123 --datadir test --rpc --rpcport 8545 --rpccorsdomain "*" --rpcapi "admin, db, eth, debug, miner, net, shh, txpool, personal, web3" console --shh

- truffle을 이용하여 스마트 컨트랙트 컴파일 및 배포합니다.
    - cd EthereumClassFinalProject\truffle> truffle.cmd compile
    - cd EthereumClassFinalProject\truffle> truffle.cmd migrate

- 서버 구동
    - node server.js

## 실행방법

- Geth 내 등록된 계좌로 학생, 선생님 로그인
- 선생님, 학생 등록 또는 이력서 다운로드시 Geth 마이닝 필수
- Whisper 채팅 페이지는 15초마다 새로고침 되도록 설정하였습니다.

## 유의사항

- console log에 Run Outof Gas 메세지가 나올경우 router/API/ContractAPI에서 gas를 500000 단위로 조절을 해줍니다.

- Chatting 구현은 Whisper 프로토콜로 구현하였으며, 크롬 웹브라우저를 두 개 여신다음 각각 관리자, 클라이언트로 구성하여 확인합니다.

- NodeJS 백앤드에서는 Metamask를 Provider로 쓸 수 없음
    - 메타마스크의 web3 provider는 브라우저 객체(widnow)에서 제공됨
    - 대신, MainPage가 처음 띄워질때, 메타마스크를 연동할수있게끔은 구현을 했지만, 클릭 이벤트를 통해 Router 처리시 백앤드에서 요청과 응답을 처리하므로 메타마스크를 띄워줄 순 없음
    - 메타마스크를 띄우기 위해서는 
        - ejs에서 POST 데이터 form 요청을 보낼때 routing으로 데이터를 처리하는 것이 아닌, script 태그를 써서 구현할 수 있음 but NodeJS 특성상 이 방법은 추천하지 않음
        - 아래 코드는 registerStudent.ejs 파일에서 학생 정보를 블록체인에 등록하는 과정 중, 나이값을 넣는 과정

            ```html
            <script>
            window.addEventListener('load',async function() {
            if (window.ethereum) {
                try {
                // Request account access if needed
                await ethereum.enable();
                } catch (error) {
                console.log(error)
                // User denied account access...
                }
            }
            // Legacy dapp browsers...
            else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider);
            }
            // Non-dapp browsers...
            else {
                console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
            }
            });

            var contract = new web3.eth.Contract(ABI, CA);

            </script>

            <script>
                
                var btn = document.querySelector(".submitButton");
                btn.addEventListener("click", function(evt){
                    evt.preventDefault(); // form 요청값이 routing으로 안가게 막음
                    var stu_name = document.querySelector("[name='age']").value; // 나이 값을 가져오는데, css attribute 속성으로 가져옴
                    contract.methods.registerStudent(...)
                })
            </script>
            ```

        - NodeJS 프론트앤드 프레임워크 (e.g React..)에서 작동시키거나, 프론트앤드 개발환경에서 제공되는 개발용 서버(webpack-dev-server) 같은 것을 이용해야합니다

- Truffle로 컨트랙트 컴파일, 배포시 
    - 솔리디티 버전 5.0 버전으로 설정해줍니다.
    - Gas량은 Block Gas Limit을 넘지 않도록 설정하여 truffle-config.js 의 가스 부분을 수정해줍니다.
        - truffle migrate 할 때 에러나면 가스 수정!


