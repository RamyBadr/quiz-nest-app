'use strict';

interface IConstraintErrors {
    [constraintKey: string]: string;
}

export const ConstraintErrors: IConstraintErrors = {
    IDX_d7c29be02a99ec0bd718d0353e: 'error.unique.text.quiz_id',
    IDX_3a3959e5d966fdcb71e968a3c5: 'error.unique.question_id.iscorrect.true',
    FK_c53dcc93d13da0325edc6a03f16: 'error.author_id.not_found',
    FK_46b3c125e02f7242662e4ccb307: 'error.quizId.not_found',
    FK_677120094cf6d3f12df0b9dc5d3: 'error.questionId.not_found',
    IDX_81384d952822996cab8325da14: 'error.unique.title.author_id',
    UQ_97672ac88f789774dd47f7c8be3: 'error.unique.email',
    IDX_e8b96e302d92add5289fe17206: 'error.unique.text.question_id',
};
