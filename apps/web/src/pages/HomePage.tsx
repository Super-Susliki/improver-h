import { useFundWallet, usePrivy, useWallets, type EIP1193Provider } from "@privy-io/react-auth"
import { SUPPORTED_CHAIN } from "../lib/chains";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IntMaxClient, TokenType, type PrepareDepositTransactionRequest } from "intmax2-client-sdk";
import { useIntMaxClientStore } from "@/hooks/use-int-max-client";
import { useIntMaxLogin } from "@/hooks/use-int-max-login";
import { parseEther, zeroAddress } from "viem";
import { useIntMaxBalances } from "@/hooks/use-int-max-balances";

export const HomePage = () => {
    const { ready, authenticated, user, login, logout } = usePrivy();
    const { intMaxClient, setIntMaxClient } = useIntMaxClientStore();
    const { fundWallet} = useFundWallet();
    const { wallets} = useWallets();
    const [intMaxState, setIntMaxState] = useState<any>({
        isLoggedIn: false,
        address: null,
    });
    const { login: loginIntMax, isPending: isLoginIntMaxPending, error: loginIntMaxError } = useIntMaxLogin();
    const { data: balances, isLoading: isBalancesLoading, error: balancesError } = useIntMaxBalances();

    
    useEffect(() => {
        (async () => {
            if (wallets.length === 0) return;
            const wallet = wallets[0];
            // @ts-expect-error - TODO: fix this
            setIntMaxClient(await IntMaxClient.init({environment: "testnet", provider: await wallet.getEthereumProvider()}));
        })();
    }, [wallets])

    if (!ready) return <div>Loading...</div>

    if (!authenticated) {
        return <div>
            <Button onClick={() => login()}>Login</Button>
        </div>;
    }

    const onLoginIntMax = async () => {
        if (!intMaxClient) return;
        console.log(intMaxClient);
        const loginResult = await loginIntMax();
        setIntMaxState({
            isLoggedIn: true,
            address: loginResult?.address,
        });
    }

    const onLogoutIntMax = async () => {
        if (!intMaxClient) return;
        await intMaxClient.logout();
        setIntMaxState({
            isLoggedIn: false,
            address: null,
        });
    }
    
    const onFundWallet = async () => {
        if (!user?.wallet?.address) return;
        fundWallet(user.wallet.address, {
            asset: "native-currency",
            amount: "0.001",
            chain: SUPPORTED_CHAIN,
        })
    }

    const onDepositIntMax = async () => {
        if (!intMaxClient) return;
        const listTokens = await intMaxClient.getTokensList();
        console.log(listTokens);
        const ether = listTokens.find(token => token.contractAddress === zeroAddress);
        if (!ether) return;
        const params: PrepareDepositTransactionRequest = {
            address: intMaxClient.address,
            token: {
                ...ether,
                tokenType: TokenType.NATIVE,
            },
            // @ts-expect-error - TODO: fix this
            amount: "0.01",

        }
        const response = await intMaxClient.deposit(params);
        console.log(response);
    }

    return <main className="grid grid-cols-2 gap-2 p-2"> 
        <div className="border border-black rounded-lg p-2">
            <h1>Ethereum</h1>
            <p>Welcome {user?.wallet?.address}</p>
            <Button onClick={() => logout()}>Logout</Button> 
            <Button onClick={onFundWallet}>Fund Wallet</Button>
        </div>
        <div className="border border-black rounded-lg p-2">
            <h1>Intmax</h1>
            <p>Welcome {intMaxState?.address || "Not logged in yet"}</p>
            {intMaxState?.isLoggedIn 
                ? <><Button onClick={onLogoutIntMax}>Logout</Button> 
                <Button onClick={onDepositIntMax}>Deposit</Button>
                <p>{JSON.stringify(balances, null, 2)}</p>
                </>
                : <Button onClick={onLoginIntMax}>Login</Button>
            }
        </div>
    </main>
}