import React, { Component } from 'react';

// const Client = require('pg');
// const PgQueryStream = require('pg-query-stream');
import ctx from 'koa';
import exceljs from 'exceljs';

class Excel extends Component {

  constructor() {
    super();

    // const pgDirectClient = new Client({
    //   user: 'postgres',
    //   host: '127.0.0.1',
    //   database: 'test',
    //   password: '123456',
    //   port: '5432',
    // });
    // pgDirectClient.connect();
    
    // const sqlQueryStream = pgDirectClient.query(new PgQueryStream("SELECT * FROM users"));
    // console.log(sqlQueryStream);
    const fileFormat = 'xlsx';
    const formatRow = row => [row.id, row.name];
    const closeStream = ctx.end;
    const sheetName = 'Sheet_1';
    const headFields = ['id', 'name'];
    const workbook = new exceljs.stream.xlsx.WorkbookWriter({
      stream: ctx.body,
      useStyles: false,
      useSharedStrings: false,
    });
    
    var sheet = workbook.addWorksheet(sheetName);
    sheet.addRow(headFields).commit();
    
    // sqlQueryStream
    //       .on('data', (data) => {
    //         sheet.addRow(formatRow(data)).commit();
    //       });
    for (let i = 0 ; i < 100 ; i++) {
      sheet.addRow(formatRow(['wef', 'wefwef'])).commit();
    }
    workbook.commit().then(() => closeStream());
    // sqlQueryStream
    //   .on('end', () => {
    //     workbook.commit().then(() => closeStream());
    //   });
  }

 render() {
  const messages = Object.keys(this.state.response);

  if (messages.length == 0) 
      return (<h1>Question not found</h1>);
  else  {
      

          return (
              <div>
                  exceljs
              </div>
          );
      }
 }
}




  export default Excel;