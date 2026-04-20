export interface TransactionScope {
  id: string;
}

export interface RepositoryContext {
  tx?: TransactionScope;
}
