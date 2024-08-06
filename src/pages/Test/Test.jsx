import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

function TestPage() {
    return (
        <>
            <PowerBIEmbed
            embedConfig = {{
            type: 'report',   // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: 'c1502823-e3d2-4781-ac8d-54b8ad460efe',
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=c1502823-e3d2-4781-ac8d-54b8ad460efe&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUNFTlRSQUwtVVMtcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d',
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOGExZWY2YzMtODMyNC00MTAzLWJmNGEtMTMyOGM1ZGMzNjUzLyIsImlhdCI6MTcyMjk1MDgxMywibmJmIjoxNzIyOTUwODEzLCJleHAiOjE3MjI5NTY1MDAsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84WEFBQUEyUUptVU5acWhId1ZxajBIcFhzTEhXMWxFeXlSdFg2SzVURUlPZWlYSjJSOExNNWpVYmJ5VzhrZ3Q2SlJabjMwdXBCR1dDQ3RrME0rTkJCZ0dhR3lDTWJoSVVBTGFUMUdFQjQrUWx0Qk05az0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJGdXJ1c2hvIEdlcm90dG8iLCJnaXZlbl9uYW1lIjoiTGFuZGVyIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjAwLjE1MC43MC40MiIsIm5hbWUiOiJMYW5kZXIgRnVydXNobyBHZXJvdHRvIiwib2lkIjoiOTdmNDY0MjAtNjIyMS00ZTQzLTg2MjMtYmE3ZGU1MGM2NTAyIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTE1Mzg5MDk1MDYtMTk0NzY5NjMxOC0xMjYwNTY2NjM5LTQwNTA0NjgiLCJwdWlkIjoiMTAwMzIwMDFDRDMwRTA0OCIsInJoIjoiMC5BUVlBd19ZZWlpU0RBMEdfU2hNb3hkdzJVd2tBQUFBQUFBQUF3QUFBQUFBQUFBQUdBSlUuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoiTjJObjBaeW02amVqWGZTS2g1aDQzX3R3VkxjaHJFclNDN1hGUnFVbTJCVSIsInRpZCI6IjhhMWVmNmMzLTgzMjQtNDEwMy1iZjRhLTEzMjhjNWRjMzY1MyIsInVuaXF1ZV9uYW1lIjoibGFuZGVyLmdlcm90dG9AcHVjcHIuZWR1LmJyIiwidXBuIjoibGFuZGVyLmdlcm90dG9AcHVjcHIuZWR1LmJyIiwidXRpIjoiY3g1bGQxVjk1VWFKRWF2cFZFOHJBUSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19pZHJlbCI6IjIgMSJ9.ayjQJphsipCbnvLRYMkl9EWigHdsMML5ZxMl7etmHuchy9OSsma46wemiYgrbTRrRnVScHijc6qLl4prtfIIqu4HIWIiJsPObqObUrI9NuLE_g4fswoeoJ9Tl0o_Xb2ds360r_dQpnq98jBEp9Y5BjmljPWaC6o0POXwIyAhhc58m0P-VjtpzfYksCKs8C5Eo_c2rAt9wIp1w_oIen5LQ5BCWdxclvSPPxuDOY79IhxFKfuxXwog392VZeySwvMstJA1X6-4REvcMTJE1Kso2Z8On1-vS3jGOGTmXl0sedj98k3ZypbxIKceDFEloSP-ZHSVLb97Iu-RrgQouQwHqQ',
            tokenType: models.TokenType.Embed, // Use models.TokenType.Aad for SaaS embed
            settings: {
                panes: {
                    filters: {
                        expanded: false,
                        visible: false
                    }
                },
                background: models.BackgroundType.Transparent,
            }
            }}

            eventHandlers = {
                new Map([
                    ['loaded', function () {console.log('Report loaded');}],
                    ['rendered', function () {console.log('Report rendered');}],
                    ['error', function (event) {console.log(event.detail);}],
                    ['visualClicked', () => console.log('visual clicked')],
                    ['pageChanged', (event) => console.log(event)],
                ])
            }

            cssClassName = { "reportClass" }

            getEmbeddedComponent = { (embeddedReport) => {
                window.report = embeddedReport;
            }}
            />
        </>
    )
}

export default TestPage;