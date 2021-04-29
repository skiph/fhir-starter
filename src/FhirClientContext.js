import React from "react";

const context = {
    client: null,
    setClient: function(client) {
        context.client = client;
    },
    patientId: null,
    setPatientId: function(patientId) {
        context.patientId = patientId;
    }
};

export const FhirClientContext = React.createContext(context);
