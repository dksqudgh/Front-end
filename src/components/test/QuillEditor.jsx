import axios from "axios";
import React from "react";
import ReactQuill from "react-quill-new";
import { uploadImageDB } from "../../service/testService";
//QuillEditor는 b_content 관계가 있음. - 색상, 이미지 처리, 들여쓰기,,,, 위지웤
//select로 조회한 결과에 b_content부분에 대한 값을 props로 받는다.- value
//spring을 활용한 파일 추가와 이미지 추가 처리
const QuillEditor = ({value, handleContent, quillRef}) => {

  const imageHandler = () => {
    //이미지를 선택하고 열기를 눌렀을 때 생성되는 DOM임.
    //리액트에서는 html에서와 같이 form태그 전송이 불가함
    //이미지를 URL로 바꾸기위해 서버로 전달할 폼데이터 만들어야 한다.
    const formData = new FormData();
    //이미지 버튼이 클릭되면 이미지를 서버로 전송하기 위해서 동적으로
    //type이 file인 input태그를 생성함
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    //이미지 파일만 선택 가능하도록 설정
    input.setAttribute("accept", "image/*");
    input.setAttribute("name", "image");
    //input file이 클릭이 발생하도록 강제함
    input.click();
    //파일 선택창에서 이미지를 선택하면 실행될 콜백 함수 등록
    input.onchange = async () => {
      try {
        const file = input.files[0]
        console.log(file);
        if(!file){
          alert("파일이 선택되지 않았습니다.");
          return
        }
        const fileType = file.name.split('.').pop().toUpperCase();
        console.log(fileType);
        if (!['JPG', 'PNG', 'JPEG'].includes(fileType)) {
            alert("jpg, png, jpeg 형식만 지원합니다.");
            return;
        }
        //위에서 만든 폼 데이터에 이미지 추가
        formData.append("image", file);
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
        const res = await uploadImageDB(formData);
        console.log(res.data);
        if (!res.data) {
            alert("이미지 업로드에 실패하였습니다.");
            return;
        }
        //오라클서버에 이미지파일을 직접 업로드하는게 아니고 파일명만 전달하고
        //실제 이미지파일은 8000서버에 pds폴더에서 읽어온다
        const url = `${process.env.REACT_APP_SPRING_IP}test/imageGet?imageName=${res.data}`;
        console.log(`Uploaded Image URL: ${url}`);
        //ReactQuill노드에 대한 Ref가 있어야 함수들을 호출할 수 있다
        //TestWrite.jsx에서 선언한 useRef()로 ReactQuill에 ref로 걸어준다
        //getEditor(): 편집기를 지원하는 Quill인스턴스를 반환함
        //반환된 인스턴스로 getText()함수를 사용할 수 있다.
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection().index;
        if (typeof range !== "number") {
            alert("에디터에 포커스가 필요합니다.");
            return;
        }
        quill.setSelection(range, 1);
        quill.clipboard.dangerouslyPasteHTML(
            range,
            `<img src=${url} style="width: 100%; height: auto;" alt="image" />`
        );
      } catch (error) {
        console.error("이미지 업로드 중 오류 발생:", error);
        alert("이미지 업로드 중 오류가 발생하였습니다.");
      }
    }
  }

  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }, { color: [] }, { 'align': [] }, { 'background': [] }],
        ["bold", "italic", "underline"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ['link', "image"],
      ],
      handlers: {
          image: imageHandler,
      },
    },
  };


  return (
    <div style={{ height: "550px", display: "flex", justifyContent: "center", padding: "0px" }}>
      <ReactQuill
          ref={quillRef}
          style={{ height: "470px", width: "100%" }}
          theme="snow"
          modules={modules}
          value={value}
          onChange={(content, delta, source, editor) => { handleContent(editor.getHTML()); }}
      />
    </div>
  );
}

export default QuillEditor;