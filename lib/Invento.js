
const toLocalDate = (isoDate) => {
    if (typeof isoDate == 'string') isoDate = new Date(isoDate);

    isoDate.setHours(isoDate.getHours() - 3)

    return isoDate.toLocaleString();
}


const b2bOrderToInvento = (b2bOrder, tokenAccount, numero) => {


    let freight = 0

    // PAYMENTS
    let payments = [];
    b2bOrder.payments.forEach(e => {
        payments.push({
            Description: e.method.toLowerCase(),
            Parcels: e.installments,
            Value: e.value,
            InventoPaymentTransaction: e.paymentId  
        });
    });


    //ITEMS
    let items = [];
    b2bOrder.items.forEach(e => {
        items.push({
            SkuCode: e.sku,
            Quantity: e.amount,
            UnitPrice: e.unit,
            DiscountAmount: e.discount ? e.discount : 0,
            FinancialAmount: e.FinancialAmount ? (e.total / e.total) * e.FinancialAmount : 0,
            TotalAmount: e.total
        });
    });

    return [{
        SellerKey: tokenAccount,
        Customer: {
            Name: b2bOrder.buyer.name,
            DocumentType: b2bOrder.buyer.documentType,
            DocumentNumber: b2bOrder.buyer.document,
            Email: b2bOrder.buyer.email,
            PhoneNumber: b2bOrder.buyer.phone,
            Gender: 1,
            StateInscription: null,
            Address: {
                Recipient: null,
                Identification: null,
                Street: b2bOrder.shipping ? b2bOrder.shipping.street : null,
                Complement: b2bOrder.shipping ? b2bOrder.shipping.comment : null,
                Number: b2bOrder.shipping ? b2bOrder.shipping.number : null,
                ZipCode: b2bOrder.shipping ? b2bOrder.shipping.zipCode : null,
                State: b2bOrder.shipping ? b2bOrder.shipping.state : null,
                City: b2bOrder.shipping ? b2bOrder.shipping.city : null,
                Neighborhood: b2bOrder.shipping ? b2bOrder.shipping.neighborhood : null,
                Reference: null
            }
        },
        Status: b2bOrder.status == 'invoiced' ? 2 : b2bOrder.status == 'paid' ? 1 : b2bOrder.status == 'cancelled' ? 9 : 0,
        Number: numero,
        SaleDate: b2bOrder.dateClosed ? toLocalDate(b2bOrder.dateClosed) : null,
        CancellationDate: null,
        Payments: payments,
        CarrierService: {
            Description: b2bOrder.shipping && b2bOrder.shipping.trackingMethod ? b2bOrder.shipping.trackingMethod.toLowerCase() : 'À COMBINAR',
            ShippingAmount: freight,
            DeliveryDate: b2bOrder.shipping && b2bOrder.shipping.estimateDeliveryDate ? toLocalDate(b2bOrder.saleDate) : null,
            Gift: null,
            GiftMessage: null,
            Transports: null,
            ShippingAddress: {
                Recipient: null,
                Identification: null,
                Street: b2bOrder.shipping ? b2bOrder.shipping.address : null,
                Complement: b2bOrder.shipping ? b2bOrder.shipping.comment : null,
                Number: b2bOrder.shipping ? b2bOrder.shipping.number : null,
                ZipCode: b2bOrder.shipping ? b2bOrder.shipping.zipCode : null,
                State: b2bOrder.shipping ? b2bOrder.shipping.state : null,
                City: b2bOrder.shipping ? b2bOrder.shipping.city : null,
                Neighborhood: b2bOrder.shipping ? b2bOrder.shipping.neighborhood : null,
                Reference: null
            }
        },
        Amount: b2bOrder.gross,
        FinancialAmount: parseFloat((items.reduce((n, { FinancialAmount }) => n + FinancialAmount, 0)).toFixed(2)),
        "Channel": "Portal B2B",
        PriceListName: null,
        TotalAmountCollected: b2bOrder.gross + freight,
        Fulfillment: b2bOrder.shipping ? b2bOrder.shipping.fulfillment : false,
        FulfillmentInvoiceLink: b2bOrder.invoice ? b2bOrder.invoice.invoiceLink : '',
        Items: items,
        Messages: null
    }];
}