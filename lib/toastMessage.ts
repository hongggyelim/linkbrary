const toastMessages = {
  success: {
    login: "로그인 되었습니다",
    signup: "회원가입에 성공했습니다",
    addLink: "링크를 추가했습니다",
    addFolder: "폴더가 추가되었습니다.",
    deleteLink: "링크가 삭제되었습니다",
    deleteFolder: "폴더가 삭제되었습니다",
    editLink: "링크가 수정되었습니다",
    editFolder: "폴더가 수정되었습니다",
    copyLink: "링크가 복사되었습니다", // SNS 모달에서 링크 복사 시
    SNSshare: "공유가 완료되었습니다",
  },
  error: {
    login: "로그인 실패: 이메일 또는 비밀번호를 확인해주세요",
    signup: "회원가입 실패: 이메일 또는 비밀번호를 확인해주세요",
    addLink: "링크 추가에 실패했습니다",
    addFolder: "폴더 추가에 실패했습니다",
    deleteLink: "링크 삭제에 실패했습니다",
    deleteFolder: "폴더 삭제에 실패했습니다",
    deleteNonEmptyFolder: "비어있는 폴더만 삭제할 수 있습니다",
    editLink: "링크 수정에 실패했습니다",
    editFolder: "폴더 수정에 실패했습니다",
    copyLink: "링크가 복사되지 않았습니다", // SNS 모달에서 링크 복사 시
    SNSshare: "공유에 실패했습니다",
    inputLink: "링크를 입력해주세요",
    inputFolderName: "폴더 이름을 입력해주세요",
    limitFolderNameLength: "6자 이하로 입력해주세요",
    selectFolder: "폴더를 선택해주세요",
    sameLink: "이미 저장된 링크 주소입니다",
    sameFolderName: "같은 이름으로는 수정할 수 없습니다",
    invalidLink: "잘못된 링크 형식입니다",
    invalidLinkCount: "폴더 정보를 받아오는데 실패했습니다",
  },
};

export default toastMessages;
