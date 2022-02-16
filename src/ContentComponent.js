import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import abi from "./abi.json";
const ContentComponent = () => {
  const { activate, deactivate, library, account, active } = useWeb3React();
  const injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  });
  const [sign, setsign] = useState();
  const [address, setad] = useState();
  const [pr, setpr] = useState();
  const [ur, setur] = useState();
  const [id, setid] = useState();

  const onConnectClicked = async () => {
    try {
      await activate(injected);
    } catch (ex) {
      console.log(ex);
    }
  };

  const onDisconnectClicked = () => {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  };
  useEffect(async () => {
    if (active) {
      loadContract();
    }
  }, [active]);
  const loadContract = async () => {
    // loading smart contract .
    console.log(library.eth);
    const contract = await new library.eth.Contract(
      abi,
      "0x75D8EEd914EE20F6a1bc1D9a456B6F2053d6C89F"
    );
    console.log(contract);
    // etting smart contract to Stoploss usestate.
  };

  const onMetamaskSignClicked = async () => {
    // Note: messageHash is a string, that is 66-bytes long, to sign the
    //       binary value, we must convert it to the 32 byte Array that
    //       the string represents
    //
    // i.e.
    //   // 66-byte string
    //   "0x592fa743889fc7f92ac2a37bb1f5ba1daf2a5c84741ca0e0061d243a2e6707ba"
    //
    //   ... vs ...
    //
    //  // 32 entry Uint8Array
    //  [ 89, 47, 167, 67, 136, 159, 199, 249, 42, 194, 163,
    //    123, 177, 245, 186, 29, 175, 42, 92, 132, 116, 28,
    //    160, 224, 6, 29, 36, 58, 46, 103, 7, 186]

    const message = ethers.utils.solidityKeccak256(
      ["address", "string"],
      ["0xcbF8f3572ee696b35a1824b92848b4C122981b87", "Akhilesh"]
    );
    console.log(message);
    const arrayifyMessage = ethers.utils.arrayify(message);
    console.log(arrayifyMessage);
    const flatSignature = await library
      .getSigner()
      .signMessage(arrayifyMessage);
    console.log(flatSignature);
  };

  const onPrivateKeySignClicked = async () => {
    const message = ethers.utils.solidityKeccak256(
      ["address", "uint256"],
      ["0xe55A9178A03c71C0FDA2D04f225b80D638255E8e", "1"]
    );
    console.log(message);
    const arrayifyMessage = ethers.utils.arrayify(message);
    console.log(arrayifyMessage);
    const flatSignature = await new ethers.Wallet(
      process.env.REACT_APP_PRIVATE_KEY
    ).signMessage(arrayifyMessage);
    console.log(flatSignature);
  };
  console.log(library);

  return (
    <div className="flex flex-col items-center pt-10 space-y-3">
      <div className="flex flex-row space-x-3">
        <button
          onClick={onConnectClicked}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect Wallet
        </button>
        <button
          onClick={onDisconnectClicked}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Disconnect Wallet
        </button>
      </div>
      <div>Account: {account || "NOT CONNECTED"}</div>
      <div className="flex flex-row space-x-3">
        <button
          onClick={onMetamaskSignClicked}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign with metamask
        </button>
        <button
          onClick={onPrivateKeySignClicked}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign with private key
        </button>
        <input
          placeholder="Enter signature`"
          value={sign}
          onChange={(e) => setsign(e.target.value)}
          style={{ border: "2px solid big-blue" }}
        />

        <input
          value={address}
          onChange={(e) => setad(e.target.value)}
          placeholder="Enter Enter user address`"
          style={{ border: "2px solid big-blue" }}
        />

        <input
          value={pr}
          onChange={(e) => setpr(e.target.value)}
          placeholder="Enter price`"
          style={{ border: "2px solid big-blue" }}
        />
        <input
          value={id}
          onChange={(e) => setid(e.target.value)}
          placeholder="Enter id`"
          style={{ border: "2px solid big-blue" }}
        />
        <input
          value={ur}
          onChange={(e) => setur(e.target.value)}
          placeholder="Enter uri`"
          style={{ border: "2px solid big-blue" }}
        />
        <button
          onClick={onPrivateKeySignClicked}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          buyNFT
        </button>
      </div>
    </div>
  );
};
export default ContentComponent;
