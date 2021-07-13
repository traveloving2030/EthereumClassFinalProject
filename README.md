# EthereumClassFinalProject

- Geth 버전은 1.8 버전으로 합니다.
    - geth --networkid 123 --datadir test --rpc --rpcport 8545 --rpccorsdomain "*" --rpcapi "admin, db, eth, debug, miner, net, shh, txpool, personal, web3" console --shh



- console log에 Run Outof Gas 메세지가 나올경우 router/API/ContractAPI에서 gas를 500000 단위로 조절을 해줍니다.

- Chatting 구현은 Whisper 프로토콜로 구현하였으며, 크롬 웹브라우저를 두 개 여신다음 각각 관리자, 클라이언트로 구성하여 확인합니다.

- NodeJS 백앤드에서는 Metamask를 Provider로 쓸 수 없음
    - 메타마스크의 web3 provider는 window 객체에서 제공됨
    - 대신, MainPage가 처음 띄워질때, 메타마스크를 연동할수있게끔은 구현하지만, 클릭 이벤트를 통해 Router 처리시 백앤드에서 요청과 응답을 처리하므로 메타마스크를 띄워줄 순 없음

- Truffle로 컨트랙트 컴파일, 배포시 
    - 솔리디티 버전 5.0 버전으로 설정해줍니다.
    - Gas량은 Block Gas Limit을 넘지 않도록 설정하여 truffle-config.js 의 가스 부분을 수정해줍니다.
        - truffle migrate 할 때 에러나면 가스 수정!


