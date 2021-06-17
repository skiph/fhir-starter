import React from "react"
import FhirClientProvider from "./FhirClientProvider"
import Chart from "./Chart"
import Patient from "./Patient"

/**
 * Wraps everything into `FhirClientProvider` so that any component
 * can have access to the fhir client through the context.
 */
export default function Page() {
  return (
    <FhirClientProvider>
      <div>
        <nav className="flex items-center justify-between bg-yellow-400 p-6">
          <div className="flex items-center flex-no-shrink text-black mr-6">
            <img
              className="object-contain h-12"
              src={process.env.PUBLIC_URL + "/approov-logo.png"}
            />
            <span className="pl-8 font-semibold text-xl">FHIR-Starter</span>
          </div>

          <div>
            <a
              href="#launch"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0"
            >
              Patient
            </a>
          </div>
        </nav>

        <div className="mt-16 ml-16 text-xl">
          <Patient />
          <hr />
          <Chart />
          <br />
        </div>
      </div>
    </FhirClientProvider>
  )
}
