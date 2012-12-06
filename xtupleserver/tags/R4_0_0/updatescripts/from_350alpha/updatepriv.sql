UPDATE priv
SET priv_name = 'ReleasePurchaseOrders',
    priv_descrip = 'Can Release Purchase Orders'
WHERE (priv_name='PostPurchaseOrders');