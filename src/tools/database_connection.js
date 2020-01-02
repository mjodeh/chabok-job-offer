import { ClickHouse } from "clickhouse";
const clickHouse = new ClickHouse({
    url: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    debug: false,
    basicAuth: {
        username: "default",
        password: "123456"
    },
    isUseGzip: false,
    config: {
        session_timeout: 60,
        output_format_json_quote_64bit_integers: 0,
        enable_http_compression: 0
    }
});

export { clickHouse };
