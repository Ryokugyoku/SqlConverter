import React, { ChangeEvent} from 'react';
/**
 * CSVのカラム数を保持する変数
 */
export let ColumnsNum = 0;

/**
 * Csvのチェック処理を行う
 * チェック処理の内容は以下の通り
 * 各行のカラム数が一致しているか
 * @param csvContent csvファイルの中身を文字列で受け取る
 */
const checkCsvColumns = (csvContent: string): void => {
    const lines = csvContent.split('\n');
    let rowColumnCount = 0;
  
    lines.forEach((line, index) => {
      console.log(`Line ${index + 1}: ${line}`);
      const columns = line.split(',');
      if (rowColumnCount === 0) {
        rowColumnCount = columns.length;
      } else if (rowColumnCount !== columns.length) {
        console.log('Error: The number of columns is different from the first row.');
      }
    });
  
    if (rowColumnCount > 0) {
      console.log(`The number of columns is ${rowColumnCount}`);
    } else {
      console.log('Error: The number of columns is 0.');
    }
    ColumnsNum = rowColumnCount;
  };
  
/**
 * Fileアップロードイベントの処理を行う
 * @param event 
 * @returns 
 */
  export const handleFileCsvChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const result = e.target?.result as string;
      if (result) {
        checkCsvColumns(result);
      }
    };

    reader.readAsText(file);
  };