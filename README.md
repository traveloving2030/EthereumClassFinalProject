# EthereumClassFinalProject

- Geth 버전은 1.8 버전으로 합니다.
    - geth --networkid 123 --datadir test --rpc --rpcport 8545 --rpccorsdomain "*" --rpcapi "admin, db, eth, debug, miner, net, shh, txpool, personal, web3" console --shh

- Remix 솔리디티 버전 5.0 버전으로 설정해줍니다.

- console log에 Run Outof Gas 메세지가 나올경우 router/API/ContractAPI에서 gas를 500000 단위로 조절을 해줍니다.

- Chatting 구현은 Whisper 프로토콜로 구현하였으며, 크롬 웹브라우저를 두 개 여신다음 각각 관리자, 클라이언트로 구성하여 확인합니다.
