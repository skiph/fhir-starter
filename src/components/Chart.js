import React from "react";
import ChartJS from "chart.js";
import { FhirClientContext } from "../FhirClientContext";

export default class Chart extends React.Component {
    static contextType = FhirClientContext;

    loadData() {
        const client = this.context.client;

        const q = new URLSearchParams();
        q.set("code", "http://loinc.org|55284-4");
        q.set("subject",  client.getPatientId() || this.context.patientId );

        client
            .request(`Observation?${q}`, {
                pageLimit: 0,
                flat: true
            })
            .then(bp => {
                try {
                    if (bp && bp.length > 0 && bp[0].component) {
                        console.log(`bp[0].component: ${bp[0].component}`)
                        const bpMap = {
                            systolic: [],
                            diastolic: []
                        };
                        bp.forEach(o => {
                            console.log(`bp[o] component: ${o.component}`)
                            o.component.forEach(c => {
                                const code = client.getPath(c, "code.coding.0.code");
                                if (code === "8480-6") {
                                    bpMap.systolic.push({
                                        x: new Date(o.effectiveDateTime),
                                        y: c.valueQuantity.value
                                    });
                                } else if (code === "8462-4") {
                                    bpMap.diastolic.push({
                                        x: new Date(o.effectiveDateTime),
                                        y: c.valueQuantity.value
                                    });
                                }
                            });
                        });
                        bpMap.systolic.sort((a, b) => a.x - b.x);
                        bpMap.diastolic.sort((a, b) => a.x - b.x);
                        if (bpMap.systolic.length > 0 || bpMap.diastolic.length > 0) {
                            this.renderChart(bpMap);
                        } else {
                            this.renderNoBP()
                        }
                } else {
                    this.renderNoBP()
                }
            } catch (e) {
                this.renderNoBP()
            }
        });
    } // end function

    renderNoBP() {
        const canvas = document.getElementById('myChart');
        const ctx = canvas.getContext('2d');
        ctx.font = '24px serif';
        ctx.fillText('Blood Pressure Not Available', 0, 50);
    }

    renderChart({ systolic, diastolic }) {
        this.chart = new ChartJS("myChart", {
            type: "line",
            data: {
                datasets: [
                    {
                        label: "Systolic",
                        data: systolic,
                        borderWidth: 2,
                        borderColor: "rgba(200, 0, 127, 1)",
                        fill: false,
                        cubicInterpolationMode: "monotone"
                    },
                    {
                        label: "Diastolic",
                        data: diastolic,
                        borderWidth: 2,
                        borderColor: "rgba(0, 127, 255, 1)",
                        fill: false,
                        cubicInterpolationMode: "monotone"
                    }
                ]
            },

            options: {
                responsive: false,
                scales: {
                    yAxes: [
                        {
                            offset: true,
                            ticks: {
                                beginAtZero: true,
                                min: 0,
                                max: 200,
                                stepSize: 20
                            }
                        }
                    ],
                    xAxes: [
                        {
                            type: "time"
                        }
                    ]
                },
                title: {
                    text: "Blood Preasure",
                    display: true,
                    fontSize: 20
                }
            }
        });
    }

    shouldComponentUpdate() {
        return false;
    }
    componentWillUnmount() {
        this.chart && this.chart.destroy();
    }
    componentDidMount() {
        this.loadData();
    }
    render() {
        return <canvas id="myChart" width="600" height="400" />;
    }
}
