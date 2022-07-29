import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, generateSac } from "./utils/interact.js";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [numeroserie, setNumeroserie] = useState("");
  const [taille, setTaille] = useState("");
  const [couleur, setCouleur] = useState("");
  const [modele, setModele] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
 
  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setStatus(status); 
    addWalletListener();
  }, []);

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const onMintPressed = async () => {
    const { status } = await generateSac(url, numeroserie, modele, couleur, taille, description);
    setStatus(status);
  };

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("You are succesfully connected !");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }
  
  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connecter Metamask</span>
        )}
      </button>

      <br></br>
      <h1 id="title">Demo NFT Crystalchain</h1>
      <p>
        Onglet de la plateforme Crystalchain, simplement ajouter le lien, le nom et la description et appuyer sur "Générer"
      </p>
      <form>
        <h2>🖼 Lien image: </h2>
        <input
          type="text"
          placeholder="https://france-estimations.fr/wp-content/uploads/2019/06/sac-chanel-cuir-matelasse-299x247.jpg"
          onChange={(event) => setURL(event.target.value)}
        />
        <h2>🔢️ Numero de serie: </h2>
        <input
          type="text"
          placeholder="22107856"
          onChange={(event) => setNumeroserie(event.target.value)}
        />
        <h2>👛️ Modele: </h2>
        <input
          type="text"
          placeholder="Chanel 22"
          onChange={(event) => setModele(event.target.value)}
        />
        <h2>⬛️ Couleur: </h2>
        <input
          type="text"
          placeholder="Noire"
          onChange={(event) => setCouleur(event.target.value)}
        />
        <h2>🤔 Taille: </h2>
        <input
          type="int"
          placeholder="156"
          onChange={(event) => setTaille(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          type="text"
          placeholder="Sac Chanel 22 rose"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Générer
      </button>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default Minter;
