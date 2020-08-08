

- Popup needs to know is locked or unlocked
    locked: *you need to prompt for the passphrase*
    unlocked: **
    
    
    
possible starting states:
   locked: encrypted info in Background Local Storage (user needs to enter passphrase)
   unlocked: nothing in background Local Storage
        * Create New Wallet
        * Restore Existing Wallet

    
getState : {
    state: string (locked | unlocked | uninitialized)
}