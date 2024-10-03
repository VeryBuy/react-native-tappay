export var UpdateCardStatus;
(function (UpdateCardStatus) {
    /** 欄位已填好，並且沒有問題 */
    UpdateCardStatus[UpdateCardStatus["Correct"] = 0] = "Correct";
    /** 欄位還沒有填寫 */
    UpdateCardStatus[UpdateCardStatus["NotFilledIn"] = 1] = "NotFilledIn";
    /** 欄位有錯誤，此時在 CardView 裡面會用顯示 errorColor */
    UpdateCardStatus[UpdateCardStatus["Wrong"] = 2] = "Wrong";
    /** 使用者正在輸入中 */
    UpdateCardStatus[UpdateCardStatus["Typing"] = 3] = "Typing";
})(UpdateCardStatus || (UpdateCardStatus = {}));
