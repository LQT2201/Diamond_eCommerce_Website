function show_display(id) {
    if (id == "shipment_content") {
        document.querySelector(`.row.${id}`).style.display = "block";
        document.querySelector(`.row.onstore_content`).style.display = "none";
    }
    if (id == "onstore_content") {
        document.querySelector(`.row.${id}`).style.display = "block";
        document.querySelector(`.row.shipment_content`).style.display = "none";
    }
}