import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { WalletLayer2NFTStates } from "./interface";
import { SagaStatus } from "@loopring-web/common-resources";

const initialState: WalletLayer2NFTStates = {
  walletLayer2NFT: [],
  total: 0,
  status: "DONE",
  errorMessage: null,
  page: -1,
};
const walletLayer2NFTSlice: Slice<WalletLayer2NFTStates> = createSlice({
  name: "walletLayer2NFT",
  initialState,
  reducers: {
    updateWalletLayer2NFT(state, _action: PayloadAction<{ page?: number }>) {
      state.status = SagaStatus.PENDING;
    },
    reset(state) {
      state = {
        ...initialState,
      };
      state.status = SagaStatus.UNSET;
    },
    socketUpdateBalance(state) {
      state.status = SagaStatus.PENDING;
    },
    getWalletLayer2NFTStatus(
      state,
      action: PayloadAction<WalletLayer2NFTStates>
    ) {
      const nfts = [
        ...action.payload.walletLayer2NFT.filter(
          (item) =>
            item.metadata?.base.name.split(" ")[0] === "Ice" &&
            item.metadata?.base.name.split(" ")[1] === "Cream" &&
            item.metadata?.base.name.split(" ")[2] === "Society"
        ),
      ];
      // @ts-ignore
      if (action.error) {
        state.status = SagaStatus.ERROR;
        // @ts-ignore
        state.errorMessage = action.error;
      }
      state.walletLayer2NFT = nfts;
      state.total = nfts.length ?? 0;
      state.status = SagaStatus.DONE;
      state.page = action.payload.page ?? 1;
    },
    statusUnset: (state) => {
      state.status = SagaStatus.UNSET;
    },
  },
});
export { walletLayer2NFTSlice };
export const {
  updateWalletLayer2NFT,
  socketUpdateBalance,
  getWalletLayer2NFTStatus,
  statusUnset,
  reset,
} = walletLayer2NFTSlice.actions;
