"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [vulnerabilities, setVulnerabilities] = useState([]);

  useEffect(() => {
    const getVulnerabilities = async () => {
      try {
        let response = await fetch("https://services.nvd.nist.gov/rest/json/cves/2.0");
        if (!response.ok) {
          throw new Error("Failed to fetch vulnerabilities");
        }
        let data = await response.json();
        const sortedVulnerabilities = data.vulnerabilities.sort((a: any, b: any) =>
          new Date(b.cve.published).getTime() - new Date(a.cve.published).getTime());
        setVulnerabilities(sortedVulnerabilities);
      } catch (error) {
        console.error(error);
      }
    };

    getVulnerabilities();
  }, []);

  return (
    <div>
      <p className="px-2 py-2 text-3xl text-gray-600">Vulnerabilities</p>
      <table className="w-full text-sm text-left rtl:text-right text-gray-600">
        <thead className="text-base text-white  bg-gray-50 dark:bg-gray-700">
          <tr>
            <td className="px-5 py-4">CVE_ID</td>
            <td className="px-5 py-4">Description</td>
            <td className="px-5 py-4">Published</td>
            <td className="px-5 py-4">LastModified</td>
            <td className="px-5 py-4">More Detail</td>
          </tr>
        </thead>

        {vulnerabilities.map((cvedata: any) => (
          <tr key={cvedata.cve.id}>
            <td className="px-5 py-3">{cvedata.cve.id}</td>
            <td className="px-5 py-3">{cvedata.cve.descriptions[0].lang}</td>
            <td className="px-5 py-3">{cvedata.cve.published}</td>
            <td className="px-5 py-3">{cvedata.cve.lastModified}</td>
            <td className="px-5 py-3">
              <button className="text-sky-600 underline" 
              onClick={() => window.open(`/vulnerability/${cvedata.cve.id}`, '_blank')}>
                Click here
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}
